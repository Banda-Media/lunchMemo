import { useEffect, useState, createContext, useContext } from 'react';
import { auth, clientPostUserToken } from '@utils/firebase/auth';
import { IAuthContext } from '@typing/types';
import firebase from 'firebase/app';
import nookies from 'nookies';

const register = async (
  username: string,
  password: string,
  displayName: string | undefined,
  authType: 'email-signup' | 'google-signup' | 'github-signup'
): Promise<firebase.auth.UserCredential | undefined> => {
  let userCredentials;

  if (authType === 'email-signup') {
    userCredentials = await auth.createUserWithEmailAndPassword(username, password);
    await clientPostUserToken((await userCredentials?.user?.getIdToken()) || '');
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
  let provider;
  if (authType === 'google-signup') {
    provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  } else {
    provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
  }
  const oauthCredentials = await auth.signInWithPopup(provider);
  await clientPostUserToken((await oauthCredentials?.user?.getIdToken()) || '');
  return oauthCredentials;
};

const login = async (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password).then(async (response) => {
    if (response && response.user) {
      return await clientPostUserToken(await response.user.getIdToken());
    }
    return null;
  });
};

const logout = (): Promise<void> => {
  return auth.signOut();
};

const loginAnonymously = () => {
  return auth.signInAnonymously();
};

const AuthContext = createContext<IAuthContext>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login,
  register,
  logout,
  loginAnonymously,
  loginProvider
});

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // listen for token changes, call setUser and write new token as a cookie
  useEffect(() => {
    auth.onIdTokenChanged(async (user) => {
      setLoading(true);
      if (!user) {
        setUser(null);
        setAuthenticated(false);
        nookies.set(undefined, 'token', '', {});
      } else {
        const token = await user.getIdToken();
        setUser(user);
        setAuthenticated(true);
        nookies.set(undefined, 'token', token, {});
      }
      setLoading(false);
    });
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        register,
        login,
        logout,
        isAuthenticated,
        isLoading,
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
