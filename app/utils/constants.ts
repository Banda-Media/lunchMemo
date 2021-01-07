import { UseFormOptions } from 'react-hook-form/dist/types';

export const emailRegex = /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/gim;
export const sessionTokenCookie = 'LM_SESSION_TOKEN';
export const userTokenCookie = 'LM_USER_TOKEN';
export const userLocalStorage = 'LM_FIREBASE_USER';
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
