import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import withAuthGuard from '@utils/authGuard.tsx';

Modal.setAppElement('#__next');

const HomePage: React.FC = () => <Layout></Layout>;
export default withAuthGuard(HomePage);
