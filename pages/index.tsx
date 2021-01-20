import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import withGuard, { authGuard } from '@utils/guards';
import DashboardPanel from '@components/modules/dashboard/DashboardPanel';
import LunchGroupProvider from '@hooks/LunchGroupContext';

Modal.setAppElement('#__next');

const HomePage: React.FC = (props) => (
  <Layout>
    <LunchGroupProvider>
      <DashboardPanel {...props} />
    </LunchGroupProvider>
  </Layout>
);
export default withGuard(HomePage, authGuard);
