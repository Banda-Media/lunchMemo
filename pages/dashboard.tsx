import { CookieVerificationData } from '@typing/types';
import authGuard from '@utils/authGuard';
import DashboardPanel from '@components/modules/dashboard/DashboardPanel';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Dashboard: React.FC<CookieVerificationData> = (props) => {
  const router = useRouter();
  useEffect(() => {
    console.log('Loading dashboard...');
    authGuard(router);
  }, []);

  return (
    <Layout>
      <DashboardPanel {...props} />
    </Layout>
  );
};

export default Dashboard;
