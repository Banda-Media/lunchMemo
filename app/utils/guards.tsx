import Debug from 'debug';
import { NextRouter, useRouter } from 'next/router';
import getFirebase from '@utils/firebase/firebase';
import { useEffect } from 'react';

const debug = Debug('lunchmemo:utils:guards');

export const unauthGuard = async (router: NextRouter): Promise<void> => {
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

export const authGuard = async (router: NextRouter): Promise<void> => {
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

export function withGuard<T>(
  WrappedComponent: React.FC<T>,
  guard: (router: NextRouter) => Promise<void>
): React.FC<T> {
  const ComponentWithUnauthGuard = (props: T) => {
    const router = useRouter();
    useEffect(() => {
      debug(`Rendering Component ${WrappedComponent.name}`);
      guard(router);
    }, []);
    return <WrappedComponent {...props} />;
  };
  return ComponentWithUnauthGuard;
}

export default withGuard;
