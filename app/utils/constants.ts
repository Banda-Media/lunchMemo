import { UseFormOptions } from 'react-hook-form/dist/types';

export const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const sessionTokenCookie = 'LM_SESSION_TOKEN';
export const userTokenCookie = 'LM_USER_TOKEN';
export const userLocalStorage = 'LM_FIREBASE_USER';
export const GROUPS_COLLECTION = 'lunch-groups';
export const USER_COLLECTION = 'users';
export const GROUP_OPTIONS = ['Small (1-2)', 'Medium (3-5)', 'Large (6-10)'];
export const formDefaults: UseFormOptions = {
  mode: 'onChange',
  reValidateMode: 'onChange',
  defaultValues: {},
  resolver: undefined,
  context: undefined,
  criteriaMode: 'firstError',
  shouldFocusError: true,
  shouldUnregister: true
};
