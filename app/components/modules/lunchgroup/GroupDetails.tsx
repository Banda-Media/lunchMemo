import { LunchGroupProps } from '@typing/props';
import { SanitizedUsers, GetUserProfilesResponse } from '@typing/api';

import AttendeesList from '../dashboard/components/AttendeesList';
import TimeRange from '../dashboard/components/TimeRange';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import { OneToManyRelationships, GoogleDate } from '@typing/types';
import { useEffect, useState } from 'react';
import CreatorSubtitle from '../dashboard/components/CreatorSubtitle';

const GroupDetails: React.FC<LunchGroupProps> = ({ group }) => {
  const { name, start, end, creator = {}, foods = [], users = {} } = group;
  const { getProfiles } = useLunchGroup();
  const [owner, setOwner] = useState('');
  const [profiles, setProfiles] = useState<SanitizedUsers>([]);

  const getUserProfiles = (
    users: OneToManyRelationships,
    getProfiles: CallableFunction,
    setProfiles: CallableFunction
  ): void => {
    getProfiles(Object.keys(users)).then((users: GetUserProfilesResponse) =>
      setProfiles(users.profiles || [])
    );
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

  useEffect(() => {
    getCreatorProfile(creator, getProfiles, setOwner), [creator];
    console.log(owner);
  });
  useEffect(() => getUserProfiles(users, getProfiles, setProfiles), [users]);

  const getFoodItems = () => {
    const food = Object.keys(foods).map((foodItems) => foodItems);
    return food.length === 0 ? ':( No food yet!' : food.map((foodItem) => foodItem);
  };

  return (
    <section className="bg-white md:w-3/4 lg:w-4/5 mx-auto register-login animated fadeInDown faster">
      <div className="register text-center content-center flex flex-col space-y-5 p-10">
        <h1 className="my-4 text-2xl font-semibold text-gray-700">{name}</h1>
        <h4 className="my-4 text-sm font-regular text-gray-400">
          Group Creator:
          <CreatorSubtitle owner={owner} foods={Object.keys(foods)} />
        </h4>
        <div>{getFoodItems()}</div>
        <div>USERS:</div>
        <AttendeesList users={profiles} max={10} />
        <div className="flex-1">
          <TimeRange flex-1 startTime={start as GoogleDate} endTime={end as GoogleDate} />
        </div>
      </div>
    </section>
  );
};

export default GroupDetails;
