import Image from 'next/image';
import { OneToManyRelationships } from '@typing/types';
import { GetUserProfilesResponse, SanitizedUsers } from '@typing/api';
import React, { useEffect, useState } from 'react';
import { useLunchGroup } from '@hooks/LunchGroupContext';

export interface GroupCreatorPhotoProps {
  users: OneToManyRelationships;
  creator: OneToManyRelationships;
}

const GroupCreatorPhoto: React.FC<GroupCreatorPhotoProps> = ({ users, creator }) => {
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

  const getCreatorImage = () => {
    profiles.map((user) => {
      if (user.uid === Object.keys(creator)[0]) {
        return 'photoURL' in user && user.photoURL ? setOwnerPhotoURL(user.photoURL) : 'empty';
      }
    });
  };

  return (
    <>
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
    </>
  );
};

export default GroupCreatorPhoto;
