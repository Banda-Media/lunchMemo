import firebase from 'firebase/app';
import { BaseSyntheticEvent } from 'react';

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

export interface IPostPayload {
  title: string;
  content: string;
}

export interface ISocialAction {
  clickHandler: (e: BaseSyntheticEvent | undefined) => void;
  message: string;
}

export interface IAuthContext {
  user: firebase.User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginAnonymously: () => Promise<firebase.auth.UserCredential>;
  loginProvider: (
    authType: 'google-signup' | 'github-signup'
  ) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  register: (
    username: string,
    password: string,
    displayName: string | undefined,
    authType: 'email-signup' | 'google-signup' | 'github-signup'
  ) => Promise<firebase.auth.UserCredential | firebase.auth.OAuthCredential | undefined>;
}

export interface ILogin {
  email: string;
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

export interface IDelayedCloseProps {
  delay: number;
  message: string;
}
