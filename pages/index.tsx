import Layout from '../app/components/layouts/Layout';
import Modal from 'react-modal';
import { useRouter } from 'next/router';
import authRedirect from './../app/utils/authRedirect';

Modal.setAppElement('#__next');

export const getServerSideProps = authRedirect;

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <Modal isOpen={router.route in ['login', 'signup']}>
        <div>In the modal</div>
      </Modal>
    </Layout>
  );
};

export default HomePage;
