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
  login: (username: string, password: string) => Promise<ApiTokenResponse>;
  register: (
    username: string,
    password: string,
    displayName: string | undefined,
    authType: 'email-signup' | 'google-signup' | 'github-signup'
  ) => Promise<firebase.auth.UserCredential | firebase.auth.OAuthCredential | undefined>;
  logout: () => Promise<void>;
  loginAnonymously: () => Promise<firebase.auth.UserCredential>;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IEmailLogin {
  email: string;
  password: string;
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
}
