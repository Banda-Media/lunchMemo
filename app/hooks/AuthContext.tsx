import { useRouter } from 'next/router';
import { useEffect, useState, createContext, useContext } from 'react';
import firebase from 'firebase/app';
import Debug from 'debug';
import { IAuthContext } from '@typing/types';
import { userLocalStorage } from '@utils/constants';
import getFirebase from '@services/firebase/firebase';
import {
  login,
  register,
  logout,
  loginProvider,
  loginAnonymously,
  forgot
} from '@services/firebase/auth';

const debug = Debug('lunchmemo:hooks:authContext');

const { auth } = getFirebase();

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  loadingAuthState: true,
  register,
  forgot,
  login,
  logout,
  loginAnonymously,
  loginProvider
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const router = useRouter();
  debug('Loading AuthProvider.');

  useEffect(() => {
    const userData = localStorage.getItem(userLocalStorage);
    debug('Loading initial local storage item for user state: %o', userData);
    if (userData && userData !== 'null') {
      const storageUser: firebase.User = JSON.parse(userData);
      setUser(storageUser);
    }
  }, []);

  // listen for token changes, call setUser and write new token as a cookie
  useEffect(() => {
    debug('Setting up listener for token changes.');
    const createListener = async () => {
      auth.onIdTokenChanged(
        (user) => {
          if (user) {
            debug('User id token change detected...%o', user);
            localStorage.setItem(userLocalStorage, JSON.stringify(user));
            setUser(user);
            setAuthenticated(!!user);
            setLoadingAuthState(false);
          }
        },
        () => {
          debug('User id token error...%o', user);
          localStorage.removeItem(userLocalStorage);
          setUser(null);
          setAuthenticated(false);
          setLoadingAuthState(false);
        }
      );
    };
    createListener();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const createInterval = async () => {
      debug('Setting up idToken refresh every 10 minutes.');
      const handle = setInterval(async () => {
        debug('Forcing id token refresh...');
        const user = auth.currentUser;
        if (user) await user.getIdToken(true);
      }, 10 * 60 * 1000);
      return () => clearInterval(handle);
    };
    createInterval();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingAuthState,
        register,
        forgot,
        login: async (email: string, password: string) => {
          await login(email, password);
          router.push('/profile');
        },
        logout: async (): Promise<void> => {
          await logout();
          router.push('/login');
        },
        isAuthenticated,
        loginAnonymously,
        loginProvider
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export default AuthProvider;
