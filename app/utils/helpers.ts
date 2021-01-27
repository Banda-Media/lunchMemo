import {
  CreateGroupFormData,
  FirebaseUser,
  ILunchGroup,
  OneToManyRelationships
} from '@typing/types';

export const capitalize = (s: string): string => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const setTime = (ampm: string, hours: string, minutes: string): Date => {
  const now = new Date();
  now.setHours(+hours + (ampm === 'PM' ? 12 : 0), +minutes, 0);
  return now;
};

export const formToLunchGroup = (
  {
    name,
    starthours,
    startminutes,
    endhours,
    endminutes,
    endampm,
    startampm,
    groupSize
  }: CreateGroupFormData,
  user: FirebaseUser | null
): ILunchGroup => {
  const userRefList: OneToManyRelationships = user ? { [user.uid]: true } : {};
  const [min, max] = JSON.parse(groupSize);
  return {
    name,
    min: +min,
    max: +max,
    start: setTime(startampm, starthours, startminutes),
    end: setTime(endampm, endhours, endminutes),
    creator: userRefList,
    users: userRefList,
    active: true,
    foods: {}
  };
};
