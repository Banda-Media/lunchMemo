import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import authRedirect from '@utils/authRedirect';

Modal.setAppElement('#__next');

export const getServerSideProps = authRedirect;

const HomePage: React.FC = () => {
  console.log('Loading index...');

  return <Layout></Layout>;
};

export default HomePage;
