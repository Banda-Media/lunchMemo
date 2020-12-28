import { FC } from 'react';
import Login from './components/Login';
import Layout from './components/Layout';

const LoginPage: FC = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};

export default LoginPage;
