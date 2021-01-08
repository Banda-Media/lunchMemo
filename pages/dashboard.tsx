import DashboardPanel from '@components/modules/dashboard/DashboardPanel';
import Layout from '@components/layouts/Layout';
import withGuard, { authGuard } from '@utils/guards';

const Dashboard: React.FC = (props) => (
  <Layout>
    <DashboardPanel {...props} />
  </Layout>
);
export default withGuard(Dashboard, authGuard);
