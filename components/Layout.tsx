import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = (props) => {
  const router = useRouter();
  return (
    <main>
      {router.route !== '/' && <Header />}
      <div className="site-background mx-auto">{props.children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
