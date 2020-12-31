import { useEffect, useState, createContext, useContext } from 'react';
import { auth } from '../utils/firebase/auth';
import { IAuthContext } from '../types/types.d';
import firebase from 'firebase/app';
import nookies from 'nookies';

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  isAuthenticated: false
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
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  return useContext(AuthContext);
};

export default AuthProvider;
