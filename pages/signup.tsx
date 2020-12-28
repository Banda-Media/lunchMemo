import { FC } from 'react';
import Register from './components/Register';
import Layout from './components/Layout';

const SignupPage: FC = () => {
  return (
    <Layout>
      <Register />
    </Layout>
  );
};

export default SignupPage;
