import { LunchGroupProps } from '@typing/props';
import { SanitizedUsers, GetUserProfilesResponse } from '@typing/api';
import Image from 'next/image';
import AttendeesList from '../dashboard/components/AttendeesList';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import { OneToManyRelationships } from '@typing/types';
import { useEffect, useState } from 'react';

const GroupDetails: React.FC<LunchGroupProps> = ({ group }) => {
  const { name, start, end, creator = {}, foods = [], users = {} } = group;
  const { getProfiles } = useLunchGroup();
  const [owner, setOwner] = useState('');
  const [ownerPhotoURL, setOwnerPhotoURL] = useState('');
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
    getCreatorImage();
  });
  useEffect(() => getUserProfiles(users, getProfiles, setProfiles), [users]);

  const getFoodItems = () => {
    const food = Object.keys(foods).map((foodItems) => foodItems);
    return food.length === 0 ? (
      <span>
        <span className="text-xl">No foods selected - here are some ideas:</span>
        <div className="text-md text-gray-500 pt-3"> Pizza, Vegan, Japanese, and Cuban</div>
      </span>
    ) : (
      food.map((foodItem) => foodItem)
    );
  };

  const getCreatorImage = () => {
    profiles.map((user) => {
      if (user.uid === Object.keys(creator)[0]) {
        return 'photoURL' in user && user.photoURL ? setOwnerPhotoURL(user.photoURL) : 'empty';
      }
    });
  };

  return (
    <section className="bg-white md:w-3/4 lg:w-3/4 mx-auto register-login animated fadeInDown faster">
      <div className="register text-center content-center flex flex-col p-5">
        <div className="w-full h-200 bg-blue-500 shadow p-8">
          <span className="my-4 text-5xl font-regular text-white p-5">{name}</span>
        </div>
        <div className="pt-10">{getFoodItems()}</div>
        <div className="flex flex-row p-5 justify-center">
          <span className="text-left my-4 text-md font-regular text-gray-500">
            Start:{' '}
            <span className="text-md font-regular text-gray-400">
              {new Date().toLocaleString().replace(',', '')} {start}
            </span>
          </span>
          <span className="text-left my-4 text-md font-regular text-gray-500 pl-10">
            End:{' '}
            <span className="text-md font-regular text-gray-400">
              {new Date().toLocaleString().replace(',', '')} {end}
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
            <span>
              {ownerPhotoURL ? (
                <Image
                  src={ownerPhotoURL}
                  width="70px"
                  height="70px"
                  className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
                />
              ) : (
                <i className="fas fa-user-alt"></i>
              )}
            </span>
            <span className="">{owner}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupDetails;
