import firebase from 'firebase-admin';
import type { NextApiRequest } from 'next';

export type SanitizedUsers = Array<SanitizedUser | SanitizeUserError>;

export interface SanitizedUser
  extends Omit<firebase.auth.UserRecord, 'metadata' | 'providerData' | 'toJSON'> {
  metadata?: firebase.auth.UserMetadata;
  providerData?: firebase.auth.UserInfo[];
  toJSON?: CallableFunction;
  photoURL?: string;
}

export interface SanitizeUserError {
  uid: string;
  error: {
    code: string;
    message: string;
  };
}

export interface GetUserProfilesRequest extends NextApiRequest {
  body: {
    uids: string;
  };
}

export interface GetUserProfilesResponse {
  profiles?: SanitizedUsers;
  message?: string;
  error?: { [key: string]: string };
}
