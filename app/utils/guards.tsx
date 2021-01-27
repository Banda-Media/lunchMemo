import Debug from 'debug';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import getFirebase from 'app/services/firebase/firebase';
import Loading from '@common/Loading';

const debug = Debug('lunchmemo:utils:guards');
type Dispatcher = Dispatch<SetStateAction<boolean>>;

export const unauthGuard = async (router: NextRouter, callback: Dispatcher): Promise<void> => {
  const { auth } = await getFirebase();
  debug('unAuthGuard Starting: %o', auth.currentUser);
  auth.onAuthStateChanged((user) => {
    callback(false);
    if (user) {
      debug('Authenticated...redirecting to profile');
      router.replace('/profile');
    } else {
      debug('Unauthenticated...continuing.');
    }
  });
};

export const authGuard = async (router: NextRouter, callback: Dispatcher): Promise<void> => {
  const { auth } = await getFirebase();
  debug('authGuard Starting, %o', auth.currentUser);
  auth.onAuthStateChanged((user) => {
    callback(false);
    if (!user) {
      debug('Unauthenticated...redirecting to login');
      router.replace('/login');
    } else {
      debug('Authenticated...continuing.');
    }
  });
};

export function withGuard<T>(
  WrappedComponent: React.FC<T>,
  guard: (router: NextRouter, callback: Dispatcher) => Promise<void>
): React.FC<T> {
  const ComponentWithUnauthGuard = (props: T) => {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
      debug(`Rendering Component ${WrappedComponent.name}`);
      guard(router, setLoading);
    }, []);
    return loading ? <Loading /> : <WrappedComponent {...props} />;
  };
  return ComponentWithUnauthGuard;
}

export default withGuard;
