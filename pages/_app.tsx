import '../styles/main.css';
import AuthProvider from '../hooks/auth';

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};
export default MyApp;
