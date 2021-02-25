import { LunchGroupProps } from '@typing/props';
import { SanitizedUsers, GetUserProfilesResponse } from '@typing/api';
import FoodItems from './FoodItems';
import GroupCreatorPhoto from './GroupCreatorPhoto';
import AttendeesList from '../dashboard/components/AttendeesList';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import { OneToManyRelationships } from '@typing/types';
import { useEffect, useState } from 'react';

const GroupDetails: React.FC<LunchGroupProps> = ({ group }) => {
  const { name, start, end, creator = {}, foods = [], users = {} } = group;
  const { getProfiles } = useLunchGroup();
  const [profiles, setProfiles] = useState<SanitizedUsers>([]);
  const timeStamp = new Date().toLocaleString().replace(',', '');

  const getUserProfiles = (
    users: OneToManyRelationships,
    getProfiles: CallableFunction,
    setProfiles: CallableFunction
  ): void => {
    getProfiles(Object.keys(users)).then((users: GetUserProfilesResponse) =>
      setProfiles(users.profiles || [])
    );
  };

  useEffect(() => getUserProfiles(users, getProfiles, setProfiles), [users]);

  return (
    <section className="bg-white md:w-3/4 lg:w-3/4 mx-auto register-login animated fadeInDown faster">
      <div className="register text-center content-center flex flex-col p-5">
        <div className="w-full h-200 bg-blue-500 shadow p-8">
          <span className="my-4 text-5xl font-regular text-white p-5">{name}</span>
        </div>
        <FoodItems foods={foods} />
        <div className="flex flex-row p-5 justify-center">
          <span className="text-left my-4 text-md font-regular text-gray-500">
            Start:{' '}
            <span className="text-md font-regular text-gray-400">
              {timeStamp} {start}
            </span>
          </span>
          <span className="text-left my-4 text-md font-regular text-gray-500 pl-10">
            End:{' '}
            <span className="text-md font-regular text-gray-400">
              {timeStamp} {end}
            </span>
          </span>
        </div>
        <div className="flex justify-between mt-0 px-10 pt-5 pb-10">
          <div className="justify-start">
            <div className="my-4 text-xl font-regular text-gray-500">Group Users</div>
            <AttendeesList users={profiles} max={3} size={70} spacing={5} />
          </div>

          <div className="flex flex-col justify-start content-evenly">
            <span className="my-4 text-xl font-regular text-gray-500">Group Creator</span>
            <GroupCreatorPhoto users={users} creator={creator} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupDetails;
