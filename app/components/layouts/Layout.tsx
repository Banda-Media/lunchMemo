import { useRouter } from 'next/router';
import Header from '@components/modules/main/Header/Header';
import Footer from '@components/modules/main/Footer/Footer';
import Background from '@components/modules/main/Background';

const Layout: React.FC = (props) => {
  const { route } = useRouter();

  return (
    <main className="flex flex-col h-screen justify-between">
      {['/login', '/signup', '/forgot'].indexOf(route) === -1 && <Header />}
      <div className="container-fluid my-10">{props.children}</div>
      <Background />
      <Footer />
    </main>
  );
};

export default Layout;
