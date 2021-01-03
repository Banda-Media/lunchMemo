import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import Background from './Background';

const Layout: React.FC = (props) => {
  const router = useRouter();
  return (
    <main className="flex flex-col h-screen justify-between">
      {router.route !== '/' && <Header />}
      <div className="container-fluid my-10">{props.children}</div>
      <Background />
      <Footer />
    </main>
  );
};

export default Layout;
