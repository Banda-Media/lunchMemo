import firebase from 'firebase/app';
import getFirebase from './firebase';

export const { auth } = getFirebase();

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL + '/api';

const postUserToken = async (token: string) => {
  const path = '/auth';
  const response = await fetch(API_URL + path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }) //
  });
  console.log(response.json());
  return response.json();
};

export const signIn = async (email: string, password: string): Promise<null | any> => {
  return login(email, password).then(async (response) => {
    if (response && response.user) {
      return await postUserToken(await response.user.getIdToken());
    }
    return null;
  });
};

export const login = (
  username: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(username, password);
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export const register = (
  username: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(username, password);
};

export const loginAnonymously = (): Promise<firebase.auth.UserCredential> => {
  return auth.signInAnonymously();
};
