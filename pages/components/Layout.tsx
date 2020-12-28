import { FC } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout: FC = (props) => {
  return (
    <main>
      <Header />
      <div className="container shadow-lg mx-auto bg-white mt-24 md:mt-18">{props.children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
