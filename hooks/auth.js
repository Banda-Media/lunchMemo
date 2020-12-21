import { useEffect, useState, createContext, useContext } from 'react';
import fire from '../services/firebase';
import nookies from 'nookies';

const AuthContext = createContext({
  user: null
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // listen for token changes
  // call setUser and write new token as a cookie
  useEffect(() => {
    if (fire.auth) {
      return fire.auth.onIdTokenChanged(async (user) => {
        if (!user) {
          setUser(null);
          nookies.set(undefined, 'token', '');
        } else {
          const token = await user.getIdToken();
          setUser(user);
          nookies.set(undefined, 'token', token);
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

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
