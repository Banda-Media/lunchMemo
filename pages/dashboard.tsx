import { CookieVerificationData } from '@typing/types';
import withAuthGuard from '@utils/authGuard.tsx';
import DashboardPanel from '@components/modules/dashboard/DashboardPanel';
import Layout from '@components/layouts/Layout';

const Dashboard: React.FC<CookieVerificationData> = (props) => (
  <Layout>
    <DashboardPanel {...props} />
  </Layout>
);

export default withAuthGuard(Dashboard);
