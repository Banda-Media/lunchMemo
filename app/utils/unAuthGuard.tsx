import Debug from 'debug';
import { NextRouter, useRouter } from 'next/router';
import getFirebase from '@utils/firebase/firebase';
import { useEffect } from 'react';

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

export function withUnauthGuard<T>(WrappedComponent: React.FC<T>): React.FC<T> {
  const ComponentWithUnauthGuard = (props: T) => {
    const router = useRouter();
    useEffect(() => {
      debug(`Rendering Component ${WrappedComponent.name}`);
      unAuthGuard(router);
    }, []);
    return <WrappedComponent {...props} />;
  };
  return ComponentWithUnauthGuard;
}

export default withUnauthGuard;
