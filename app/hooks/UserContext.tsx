import React, { useEffect } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import getFirebase from '@utils/firebase/firebase';
import { useRouter } from 'next/router';
import Debug from 'debug';

const { auth } = getFirebase();
const debug = Debug('lunchmemo:hooks:userContext');
const idTokenName = 'LM_USER_TOKEN';

export const UserContext = React.createContext({});

const UserProvider: React.FC = ({ children }) => {
  const router = useRouter();
  // Checks that user state has changed and then creates or destroys cookie with Firebase token.
  debug('Loading UserProvider.');
  const onAuthStateChange = () => {
    return auth.onAuthStateChanged(async (user) => {
      debug('User login detected...');
      if (user) {
        debug('routing to profile');
        const token = await user.getIdToken();
        setCookie(null, idTokenName, token, {
          expires: new Date(new Date().setDate(new Date().getDate() + 14))
        });
        router.push('/profile');
      } else {
        debug('destroying user cookies');
        destroyCookie(null, idTokenName);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    debug('setting auth state change listener');
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
