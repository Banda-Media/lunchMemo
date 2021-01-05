import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/layouts/RegistrationPanel';

const LoginPage: React.FC = () => {
  console.log('Loading login...');
  return (
    <Layout>
      <RegistrationPanel />
    </Layout>
  );
};

export default LoginPage;
