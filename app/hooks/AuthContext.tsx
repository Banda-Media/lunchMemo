import { useRouter } from 'next/router';
import { useEffect, useState, createContext, useContext } from 'react';
import firebase from 'firebase/app';
import Debug from 'debug';
import { IAuthContext } from '@typing/types';
import getFirebase from '@utils/firebase/firebase';

const debug = Debug('lunchmemo:hooks:authContext');

const register = async (
  username: string,
  password: string,
  displayName: string | undefined,
  authType: 'email-signup' | 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential | undefined> => {
  let userCredentials;
  debug(`Registering user with ${authType}`);
  const { auth } = await getFirebase();
  if (authType === 'email-signup') {
    userCredentials = await auth.createUserWithEmailAndPassword(username, password);
  } else {
    userCredentials = await loginProvider(authType);
  }

  if (userCredentials.user) {
    userCredentials.user.updateProfile({ displayName: displayName || username });
  }

  return userCredentials;
};

const loginProvider = async (
  authType: 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential> => {
  debug('Logging in with provider.');
  let provider;
  const { auth } = await getFirebase();
  if (authType === 'google-signup') {
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  } else {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
  }
  const oauthCredentials = await auth.signInWithPopup(provider);
  debug('Successfully logged in with OAuth credentials: %o', oauthCredentials);
  return oauthCredentials;
};

const login = async (email: string, password: string): Promise<void> => {
  debug('Logging in.');
  const { auth } = await getFirebase();
  await auth.signInWithEmailAndPassword(email, password);
};

const logout = async (): Promise<void> => {
  debug('Logging out.');
  const { auth } = await getFirebase();
  return auth.signOut();
};

const loginAnonymously = async () => {
  debug('Logging in anonymously.');
  const { auth } = await getFirebase();
  return auth.signInAnonymously();
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  login,
  register,
  logout,
  loginAnonymously,
  loginProvider
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  debug('Loading AuthProvider.');

  // listen for token changes, call setUser and write new token as a cookie
  useEffect(() => {
    debug('Setting up listener for token changes.');
    const createListener = async () => {
      const { auth } = await getFirebase();
      auth.onIdTokenChanged(async (user) => {
        debug('User id token change detected...%o', user);
        setUser(auth.currentUser);
        setAuthenticated(!!auth.currentUser);
      });
    };
    createListener();
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const createInterval = async () => {
      debug('Setting up idToken refresh every 10 minutes.');
      const { auth } = await getFirebase();
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
        register,
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
