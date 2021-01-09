import Debug from 'debug';
import firebase from 'firebase/app';
/* eslint-disable */
import 'firebase/auth';
import 'firebase/firestore';
/* eslint-enable */
import config from './config';
import { Firebase } from '@typing/types';

const debug = Debug('lunchmemo:app:utils:firebase:firebase');

const getFirebase = (): Firebase => {
  try {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      debug(`ERROR: Firebase initialization error ${err.message}: %o`, err.stack);
    }
  }

  return {
    app: firebase.app(),
    auth: firebase.auth(),
    firestore: firebase.firestore()
  };
};

export default getFirebase;
