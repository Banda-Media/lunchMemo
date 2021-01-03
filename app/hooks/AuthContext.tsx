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
): Promise<firebase.auth.UserCredential | firebase.auth.OAuthCredential | undefined> => {
  let userCredentials;

  if (authType === 'email-signup') {
    userCredentials = await auth.createUserWithEmailAndPassword(username, password);
  } else {
    let provider;
    if (authType === 'google-signup') {
      provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    } else {
      provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
    }
    userCredentials = await auth.signInWithPopup(provider);
    console.log('Successful OAuth signup:', userCredentials);
  }

  await clientPostUserToken((await userCredentials?.user?.getIdToken()) || '');
  if (userCredentials.user) {
    userCredentials.user.updateProfile({ displayName: displayName || username });
  }

  return userCredentials;
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
  loginAnonymously
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
        loginAnonymously
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export default AuthProvider;
