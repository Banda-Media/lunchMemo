import '../styles/main.css';
import AuthProvider from '../hooks/auth';
import type { ComponentType, FC } from 'react';

interface Props {
  Component: ComponentType;
  pageProps: any;
}

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
