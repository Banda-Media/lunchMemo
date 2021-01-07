import Debug from 'debug';
import { NextRouter, useRouter } from 'next/router';
import { useEffect } from 'react';
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

export function withAuthGuard<T>(WrappedComponent: React.FC<T>): React.FC<T> {
  const ComponentWithAuthGuard = (props: T) => {
    const router = useRouter();
    useEffect(() => {
      debug(`Rendering Component ${WrappedComponent.name}`);
      authGuard(router);
    }, []);
    return <WrappedComponent {...props} />;
  };
  return ComponentWithAuthGuard;
}

export default withAuthGuard;
