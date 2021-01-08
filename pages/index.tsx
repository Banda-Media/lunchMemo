import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import withGuard, { authGuard } from '@utils/guards';

Modal.setAppElement('#__next');

const HomePage: React.FC = () => <Layout></Layout>;
export default withGuard(HomePage, authGuard);
