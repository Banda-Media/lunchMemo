import { CookieVerificationData } from '@typing/types';
import authRedirect from '@utils/authRedirect';
import DashboardPanel from '@components/layouts/DashboardPanel';
import Layout from '@components/layouts/Layout';

export const getServerSideProps = authRedirect;

const Dashboard: React.FC<CookieVerificationData> = (props) => {
  console.log('Loading dash...');
  return (
    <Layout>
      <DashboardPanel {...props} />
    </Layout>
  );
};

export default Dashboard;
