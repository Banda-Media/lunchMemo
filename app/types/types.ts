import firebase from 'firebase/app';
import { BaseSyntheticEvent } from 'react';
import { GetUserProfilesResponse } from '@typing/api';

export type UnsubscribeCallback = () => void;

/* eslint-disable */
export interface Observer {
  next?:
    | ((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => void)
    | undefined;
  error?: ((error: firebase.firestore.FirestoreError) => void) | undefined;
  complete?: (() => void) | undefined;
}
/* eslint-enable */

export type FirestoreDoc = firebase.firestore.DocumentReference<firebase.firestore.DocumentData>;

export interface IPostPayload {
  title: string;
  content: string;
}

export interface ISocialAction {
  clickHandler: (e: BaseSyntheticEvent | undefined) => void;
  message: string;
}

export type FirebaseUser = firebase.User;

export interface IAuthContext {
  user: firebase.User | null;
  isAuthenticated: boolean;
  loadingAuthState: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginAnonymously: () => Promise<firebase.auth.UserCredential>;
  loginProvider: (
    authType: 'google-signup' | 'github-signup'
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  forgot: (email: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    displayName: string | undefined,
    authType: 'email-signup' | 'google-signup' | 'github-signup'
  ) => Promise<firebase.auth.UserCredential | firebase.auth.OAuthCredential | undefined>;
}

export interface IForgot {
  email: string;
}
export interface ILogin extends IForgot {
  password: string;
}

export interface ISignUpData extends ILogin {
  name: string;
}
export interface IEmailLogin extends ILogin {
  redirectPath: string;
}

export interface Firebase {
  app: firebase.app.App;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
}

export interface IUserContextType {
  emailLogin: (value: IEmailLogin) => void;
}

export interface CookieVerificationData {
  authenticated: boolean;
  usermail: string | undefined;
}

export interface ApiResponse {
  errors?: { [key: string]: string };
  message?: { [key: string]: string };
}

export interface ApiTokenResponse extends ApiResponse {
  token: string;
  user: {
    email: string;
    picture: string;
  };
}

export interface ApiTokenVerificationResponse extends ApiResponse {
  authenticated: boolean;
  usermail: string;
}

export interface Notification {
  message: string;
  timeout: number;
  timestamp: Date;
}

export interface INotifyContext {
  notification: Notification;
  notify: (message: string, timeout?: number) => void;
}

export type OneToManyRelationships = {
  [key: string]: boolean;
};

export type GoogleDate = {
  nanoseconds: number;
  seconds: number;
};

export type ILunchGroup = {
  name: string;
  uid?: string;
  active?: boolean;
  start?: Date | GoogleDate;
  end?: Date | GoogleDate;
  min?: number;
  max?: number;
  creator?: OneToManyRelationships;
  foods?: OneToManyRelationships;
  users?: OneToManyRelationships;
};

export interface ILunchGroupContext {
  groups: ILunchGroup[];
  loading: boolean;
  getGroup: (id: string) => Promise<ILunchGroup>;
  addGroup: (group: ILunchGroup) => Promise<void>;
  removeGroup: (name: string) => Promise<void>;
  updateGroup: (group: ILunchGroup) => Promise<void>;
  getUser: (id: string) => Promise<User>;
  getProfiles: (uids: string[]) => Promise<GetUserProfilesResponse>;
}

export interface User {
  email: string;
  uid: string;
}
export type RawUser = firebase.User | null;
export type AMPM = 'AM' | 'PM';
export type GroupSize = 'Small (1-2)' | 'Medium (3-5)' | 'Large (6+)';
export interface CreateGroupFormData {
  endampm: AMPM;
  endhours: string;
  endminutes: string;
  groupSize: GroupSize;
  name: string;
  startampm: AMPM;
  starthours: string;
  startminutes: string;
}
