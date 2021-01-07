import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/modules/registration/RegistrationPanel';
import withUnauthGuard from '@utils/unAuthGuard.tsx';

const LoginPage: React.FC = () => (
  <Layout>
    <RegistrationPanel />
  </Layout>
);
export default withUnauthGuard(LoginPage);
