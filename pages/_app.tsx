import '../app/styles/main.scss';
import type { AppProps } from 'next/app';
import AuthProvider from '../app/hooks/AuthContext';
import UserProvider from '../app/hooks/UserContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
};
export default MyApp;
