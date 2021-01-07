import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/modules/registration/RegistrationPanel';
import UnAuthGuard from '@utils/unAuthGuard';

const ForgotPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('Loading forgot...');
    UnAuthGuard(router);
  }, []);

  return (
    <Layout>
      <RegistrationPanel />
    </Layout>
  );
};

export default ForgotPage;
