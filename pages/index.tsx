import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';
import Modal from 'react-modal';
import { useRouter } from 'next/router';

Modal.setAppElement('#__next');

const HomePage: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <CreatePost />
      <Modal isOpen={router.route in ['login', 'signup']}>
        <div>In the modal</div>
      </Modal>
    </Layout>
  );
};

export default HomePage;
