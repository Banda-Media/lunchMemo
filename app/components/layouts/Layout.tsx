import { useRouter } from 'next/router';
import Header from '@components/elements/Header';
import Footer from '@components/elements/Footer';
import Background from '@components/elements/Background';

const Layout: React.FC = (props) => {
  const { route } = useRouter();

  return (
    <main className="flex flex-col h-screen justify-between">
      {['/login', '/signup'].indexOf(route) === -1 && <Header />}
      <div className="container-fluid my-10">{props.children}</div>
      <Background />
      <Footer />
    </main>
  );
};

export default Layout;
