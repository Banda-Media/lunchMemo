import Debug from 'debug';
import firebase from 'firebase/app';
import getFirebase from '@utils/firebase/firebase';

const debug = Debug('lunchmemo:utils:firebase:auth');
export const { auth } = getFirebase();

export const register = async (
  username: string,
  password: string,
  displayName: string | undefined,
  authType: 'email-signup' | 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential | undefined> => {
  let userCredentials;
  debug(`Registering user with ${authType}`);
  if (authType === 'email-signup') {
    userCredentials = await auth.createUserWithEmailAndPassword(username, password);
  } else {
    userCredentials = await loginProvider(authType);
  }

  if (userCredentials.user) {
    userCredentials.user.updateProfile({ displayName: displayName || username });
  }

  return userCredentials;
};

export const logout = async (): Promise<void> => {
  debug('Logging out.');
  return auth.signOut();
};

export const forgot = async (email: string): Promise<void> => {
  debug(`Sending password reset email to ${email}.`);
  await auth.sendPasswordResetEmail(email);
};

export const login = async (email: string, password: string): Promise<void> => {
  debug('Logging in.');
  await auth.signInWithEmailAndPassword(email, password);
};

export const loginProvider = async (
  authType: 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential> => {
  debug('Logging in with provider.');
  let provider;
  if (authType === 'google-signup') {
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  } else {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
  }
  const oauthCredentials = await auth.signInWithPopup(provider);
  debug('Successfully logged in with OAuth credentials: %o', oauthCredentials);
  return oauthCredentials;
};

export const loginAnonymously = async (): Promise<firebase.auth.UserCredential> => {
  debug('Logging in anonymously.');
  return auth.signInAnonymously();
};

export const changePassword = async (user: firebase.User, password: string): Promise<void> => {
  debug('Changing password for user: %o', user);
  return user.updatePassword(password);
};

export const deleteUser = async (user: firebase.User): Promise<void> => {
  debug('Deleting user: %o', user);
  user.delete();
};

export const reauthenticate = async (
  user: firebase.User,
  credential: firebase.auth.AuthCredential
): Promise<firebase.auth.UserCredential> => {
  debug('Deleting user: %o', user);
  return user.reauthenticateWithCredential(credential);
};
