import Debug from 'debug';
import { NextRouter } from 'next/router';
import getFirebase from '@utils/firebase/firebase';

const debug = Debug('lunchmemo:utils:authRedirect');

const unAuthGuard = async (router: NextRouter): Promise<void> => {
  const { auth } = await getFirebase();
  debug('unAuthGuard Starting, %o', auth.currentUser);
  auth.onAuthStateChanged((user) => {
    if (user) {
      debug('Authenticated...redirecting to profile');
      router.push('/profile');
    } else {
      debug('Unauthenticated...continuing.');
    }
  });
};

export default unAuthGuard;
