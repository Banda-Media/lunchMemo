import { useEffect, useState } from 'react';
import { LunchGroupProps } from '@typing/props';
import { SanitizedUsers, GetUserProfilesResponse } from '@typing/api';
import { GoogleDate, FirebaseUser, ILunchGroup, OneToManyRelationships } from '@typing/types';
import { useAuth } from '@hooks/AuthContext';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import JoinButton from './GroupButton';
import TimeRange from './TimeRange';
import AttendeesList from './AttendeesList';
import LunchGroupButton from './LunchGroupButton';
import CreatorSubtitle from './CreatorSubtitle';

const joinLeaveGroup = (
  isMember: boolean,
  group: ILunchGroup,
  user: FirebaseUser | null,
  users: OneToManyRelationships,
  callback: CallableFunction
) => {
  if (user) {
    if (isMember) {
      delete users[user.uid];
    } else {
      users[user.uid] = true;
    }
    callback(group);
  }
};

const getCreatorProfile = (
  creator: OneToManyRelationships,
  getProfiles: CallableFunction,
  setOwner: CallableFunction
): void => {
  getProfiles(Object.keys(creator)).then((users: GetUserProfilesResponse) =>
    setOwner((users.profiles && 'email' in users.profiles[0] && users.profiles[0].email) || '')
  );
};

const getUserProfiles = (
  users: OneToManyRelationships,
  getProfiles: CallableFunction,
  setProfiles: CallableFunction
): void => {
  getProfiles(Object.keys(users)).then((users: GetUserProfilesResponse) =>
    setProfiles(users.profiles || [])
  );
};

const LunchGroup: React.FC<LunchGroupProps> = ({ group, hasDetailButton = true }) => {
  const { name, uid, active, start, end, max = 3, creator = {}, foods = [], users = {} } = group;
  const { user } = useAuth();
  const { getProfiles, updateGroup } = useLunchGroup();
  const [owner, setOwner] = useState('');
  const [profiles, setProfiles] = useState<SanitizedUsers>([]);

  useEffect(() => getCreatorProfile(creator, getProfiles, setOwner), [creator]);
  useEffect(() => getUserProfiles(users, getProfiles, setProfiles), [users]);

  return (
    <div className="flex items-stretch py-2 min-w-1/2">
      <div
        className={`flex flex-col bg-white w-full px-8 py-4 shadow ${active ? '' : 'opacity-50'}`}>
        <div className="flex flex-col">
          <div className="flex space-between items-center group-container justify-between">
            <div className="flex flex-col flex-1 space-y-1">
              <h3 className="hostname font-extrabold">{name}</h3>
              <AttendeesList users={profiles} max={max} size={20} spacing={0} />
            </div>
            <div className="flex-1">
              <TimeRange flex-1 startTime={start as GoogleDate} endTime={end as GoogleDate} />
            </div>
            <div className="flex-none">
              <JoinButton
                onClick={(isMember) => joinLeaveGroup(isMember, group, user, users, updateGroup)}
                uid={user?.uid || ''}
                users={users}
                active={!!active}
                max={max}
              />
            </div>
          </div>
        </div>
        <CreatorSubtitle owner={owner} foods={Object.keys(foods)} />
      </div>
      {hasDetailButton && <LunchGroupButton name={uid || ''} />}
    </div>
  );
};
export default LunchGroup;
