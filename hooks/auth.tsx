import { useEffect, useState, createContext, useContext } from 'react';
import fire from '../services/firebase';
import firebase from 'firebase/app';
import nookies from 'nookies';

export interface IAuthContext {
  user: firebase.User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoading: false,
  isAuthenticated: false
});

interface IProps {
  children: React.ReactNode | undefined;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    if (fire.auth) {
      setLoading(true);
      return fire.auth.onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          nookies.set(undefined, 'token', '', {});
          setAuthenticated(true);
        } else {
          const token = await user.getIdToken();
          setUser(user);
          setLoading(false);
          nookies.set(undefined, 'token', token, {});
        }
      });
    }
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = fire.auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    // clean up setInterval
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

export const ProtectedRoute = ({ children }: IProps): React.ReactElement | React.ReactNode => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading || (!isAuthenticated && window.location.pathname !== '/login')) {
    // <LoadingScreen />;
    return <div>Loading...</div>;
  } else {
    return children;
  }
};

export default AuthProvider;
