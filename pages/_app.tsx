import '@styles/main.scss';
import '@styles/custom.scss';
import type { AppProps } from 'next/app';
import AuthProvider from '@hooks/AuthContext';
import UserProvider from '@hooks/UserContext';

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
