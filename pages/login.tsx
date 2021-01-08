import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/modules/registration/RegistrationPanel';
import withGuard, { unauthGuard } from '@utils/guards';

const LoginPage: React.FC = () => (
  <Layout>
    <RegistrationPanel />
  </Layout>
);
export default withGuard(LoginPage, unauthGuard);
