import firebase from 'firebase/app';
import 'firebase/auth';

import { Firebase } from '../../types/types';

import config from './config';

const getFirebase = (): Firebase => {
  try {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error(`Firebase initialization error ${err.message}`, err.stack);
    }
  }

  return { app: firebase.app(), auth: firebase.auth(), firestore: firebase.firestore() };
};

export default getFirebase;
