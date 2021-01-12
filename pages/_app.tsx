import '@styles/main.scss';
import type { AppProps } from 'next/app';
import AuthProvider from '@hooks/AuthContext';
import NotifyProvider from '@hooks/NotifyContext';
import NotificationBar from '@components/common/NotificationBar';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  typeof window !== 'undefined' &&
    localStorage.setItem('debug', process.env.DEBUG || 'lunchmemo:*');
  return (
    <AuthProvider>
      <NotifyProvider>
        <NotificationBar />
        <Component {...pageProps} />
      </NotifyProvider>
    </AuthProvider>
  );
};
export default MyApp;
