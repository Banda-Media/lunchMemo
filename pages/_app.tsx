import '../styles/main.scss';
import AuthProvider from '../hooks/auth';

export interface Props {
  Component: React.ComponentType;
  pageProps: any;
}

const MyApp: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
