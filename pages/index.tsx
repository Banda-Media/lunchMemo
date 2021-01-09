import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import withGuard, { authGuard } from '@utils/guards';
import DashboardPanel from '@components/modules/dashboard/DashboardPanel';

Modal.setAppElement('#__next');

const HomePage: React.FC = (props) => (
  <Layout>
    <DashboardPanel {...props} />
  </Layout>
);
export default withGuard(HomePage, authGuard);
