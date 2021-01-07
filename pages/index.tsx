import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/layouts/Layout';
import Modal from 'react-modal';
import authGuard from '@utils/authGuard';

Modal.setAppElement('#__next');

const HomePage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    console.log('Loading HomePage...');
    authGuard(router);
  }, []);

  return <Layout></Layout>;
};

export default HomePage;
