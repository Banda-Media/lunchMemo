import React, { useEffect } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { IUserContextType, IEmailLogin } from '../types/types.d';
import getFirebase from '../utils/firebase/firebase';
import { signIn } from '../utils/firebase/auth';

const { auth } = getFirebase();
const tokenName = 'firebaseToken';

export const UserContext = React.createContext<IUserContextType | undefined>(undefined);

const UserProvider: React.FC = ({ children }) => {
  const emailLogin = async ({ email, password, redirectPath }: IEmailLogin) => {
    console.log(`Redirecting to ${redirectPath}`);
    await signIn(email, password)
      .then(() => {
        console.log('User logged in.');
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return <UserContext.Provider value={{ emailLogin }}>{children}</UserContext.Provider>;
};

export default UserProvider;
