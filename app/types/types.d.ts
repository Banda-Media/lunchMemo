import firebase from 'firebase/app';

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

export interface PostPayload {
  title: string;
  content: string;
}

export interface IAuthContext {
  user: firebase.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

interface IEmailLogin {
  email: string;
  password: string;
  redirectPath: string;
}

export interface Firebase {
  app: firebase.app.Application;
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
