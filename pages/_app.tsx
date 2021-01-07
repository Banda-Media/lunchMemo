import '@styles/main.scss';
import '@styles/custom.scss';
import type { AppProps } from 'next/app';
import AuthProvider from '@hooks/AuthContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  console.log('Rendering app...');
  typeof window !== 'undefined' &&
    localStorage.setItem('debug', process.env.DEBUG || 'lunchmemo:*');
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
