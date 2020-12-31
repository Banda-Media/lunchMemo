import React, { useEffect } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import getFirebase from '../utils/firebase/firebase';

const { auth } = getFirebase();
const tokenName = 'firebaseToken';

export const UserContext = React.createContext({});

const UserProvider: React.FC = ({ children }) => {
  // Checks that user state has changed and then creates or destroys cookie with Firebase token.
  const onAuthStateChange = () => {
    return auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        setCookie(null, tokenName, token, {
          expires: new Date(new Date().setDate(new Date().getDate() + 14))
        });
      } else {
        destroyCookie(null, tokenName);
      }
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChange();
    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export default UserProvider;
