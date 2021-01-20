import { useEffect, useState } from 'react';
import { LunchGroupProps } from '@typing/props';
import { GoogleDate } from '@typing/types';
import { useAuth } from '@hooks/AuthContext';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import JoinButton from './GroupButton';
import TimeRange from './TimeRange';
import AttendeesList from './AttendeesList';
import LunchGroupButton from './LunchGroupButton';
import CreatorSubtitle from './CreatorSubtitle';

const parseGroupSize = (groupSize: string): readonly [number, number] => {
  const matches = (groupSize.match(/\d+/g) || ['3', '5']).map((n: string) => parseInt(n));
  return [matches[0], matches[1]];
};

const LunchGroup: React.FC<LunchGroupProps> = ({ group, hasDetailButton = true }) => {
  const {
    name,
    active,
    startTime,
    endTime,
    groupSize = '',
    creator = {},
    foods = [],
    users = {}
  } = group;
  const { user } = useAuth();
  const { getUser, updateGroup } = useLunchGroup();
  const [owner, setOwner] = useState('');
  const [, max] = parseGroupSize(groupSize);

  useEffect(() => {
    getUser && getUser(Object.keys(creator)[0]).then((user) => setOwner(user.email));
  }, [creator]);

  return (
    <div className="flex items-stretch py-2 min-w-1/2">
      <div
        className={`flex flex-col bg-white w-full px-8 py-4 shadow ${active ? '' : 'opacity-50'}`}>
        <div className="flex flex-col">
          <div className="flex space-between items-center group-container flex justify-between">
            <div className="flex flex-col flex-1 space-y-1">
              <h3 className="hostname font-extrabold">{name}</h3>
              <AttendeesList users={Object.keys(users)} max={max} />
            </div>

            <div className="flex-1">
              <TimeRange
                flex-1
                startTime={startTime as GoogleDate}
                endTime={endTime as GoogleDate}
              />
            </div>

            <div className="flex-none">
              <JoinButton
                onClick={(isMember) => {
                  if (user) {
                    if (isMember) {
                      delete users[user.uid];
                    } else {
                      users[user.uid] = true;
                    }
                    updateGroup && updateGroup(group);
                  }
                }}
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
      {hasDetailButton && <LunchGroupButton name={name} />}
    </div>
  );
};
export default LunchGroup;
