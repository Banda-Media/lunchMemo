import { useRouter } from 'next/router';
import Header from '@components/modules/main/Header/Header';
import Footer from '@components/modules/main/Footer/Footer';
import Background from '@components/modules/main/Background';

const Layout: React.FC = (props) => {
  const { route } = useRouter();

  return (
    <>
      <Background />
      <main className="flex flex-col w-screen h-screen justify-between">
        {['/login', '/signup', '/forgot'].indexOf(route) === -1 && <Header />}
        <div className="w-full h-full flex flex-col items-center my-10">{props.children}</div>
        <Footer />
      </main>
    </>
  );
};

export default Layout;
