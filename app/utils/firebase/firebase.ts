import firebase from 'firebase/app';
import 'firebase/auth';

import { Firebase } from '../../types/types';

import Debug from 'debug';
const debug = Debug('lunchmemo:app:utils:firebase:firebase');
import config from './config';

const getFirebase = (): Firebase => {
  try {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      debug(`ERROR: Firebase initialization error ${err.message}: %o`, err.stack);
    }
  }
  debug(firebase);

  return { app: firebase.app(), auth: firebase.auth(), firestore: firebase.firestore() };
};

export default getFirebase;
