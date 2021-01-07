import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/modules/registration/RegistrationPanel';
import unAuthGuard from '@utils/unAuthGuard';

const LoginPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('Loading login...');
    unAuthGuard(router);
  }, []);

  return (
    <Layout>
      <RegistrationPanel />
    </Layout>
  );
};

export default LoginPage;
