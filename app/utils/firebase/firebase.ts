import firebase from 'firebase/app';
/* eslint-disable */
import 'firebase/auth';
import 'firebase/firestore';
/* eslint-enable */

import { Firebase } from '../../types/types';

import Debug from 'debug';
const debug = Debug('lunchmemo:app:utils:firebase:firebase');
import config from './config';

const getFirebase = async (): Promise<Firebase> => {
  try {
    await firebase.initializeApp(config);
    await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      debug(`ERROR: Firebase initialization error ${err.message}: %o`, err.stack);
    }
  }

  return {
    app: await firebase.app(),
    auth: await firebase.auth(),
    firestore: await firebase.firestore()
  };
};

export default getFirebase;
