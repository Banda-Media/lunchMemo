import CreatePost from '../components/CreatePost';
import Layout from './components/Layout';

const HomePage = () => {
  return (
    <Layout>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h3>

      <p>
        Get started by editing <code>pages/index.js</code>
      </p>
      <CreatePost />
    </Layout>
  );
};

export default HomePage;
