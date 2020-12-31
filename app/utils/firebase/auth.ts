import firebase from 'firebase/app';
import getFirebase from './firebase';

export const { auth } = getFirebase();
auth.useDeviceLanguage();

const API_URL = '/api';

const postUserToken = async (token: string) => {
  const path = '/auth/token';
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

export const login = (
  username: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(username, password);
};

export const signIn = async (email: string, password: string): Promise<null | any> => {
  return login(email, password).then(async (response) => {
    if (response && response.user) {
      return await postUserToken(await response.user.getIdToken());
    }
    return null;
  });
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export const registerUser = async (
  username: string,
  password: string,
  displayName: string | undefined,
  authType: 'email-signup' | 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential | firebase.auth.OAuthCredential | undefined> => {
  let userCredentials;

  if (authType === 'email-signup') {
    userCredentials = await auth.createUserWithEmailAndPassword(username, password);
    await postUserToken((await userCredentials?.user?.getIdToken()) || '');
    if (userCredentials.user) {
      userCredentials.user.updateProfile({ displayName: displayName || username });
    }
  } else {
    let provider;
    if (authType === 'google-signup') {
      provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    } else {
      provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
    }
    const result = await auth.signInWithPopup(provider);
    console.log('Successful OAuth signup:', result);
    userCredentials = result.credential as firebase.auth.OAuthCredential;
    await postUserToken(userCredentials.accessToken || '');
  }

  return userCredentials;
};

export const loginAnonymously = (): Promise<firebase.auth.UserCredential> => {
  return auth.signInAnonymously();
};
