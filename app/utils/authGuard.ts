import Debug from 'debug';
import { NextRouter } from 'next/router';
import getFirebase from '@utils/firebase/firebase';

const debug = Debug('lunchmemo:utils:authRedirect');

const authGuard = async (router: NextRouter): Promise<void> => {
  const { auth } = await getFirebase();
  debug('authGuard Starting, %o', auth.currentUser);
  auth.onAuthStateChanged((user) => {
    if (!user) {
      debug('Unauthenticated...redirecting to login');
      router.push('/login');
    } else {
      debug('Authenticated...continuing.');
    }
  });
};

export default authGuard;
