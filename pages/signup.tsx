import Layout from '@components/layouts/Layout';
import RegistrationPanel from '@components/modules/registration/RegistrationPanel';
import withGuard, { unauthGuard } from '@utils/guards';

const SignupPage: React.FC = () => (
  <Layout>
    <RegistrationPanel />
  </Layout>
);
export default withGuard(SignupPage, unauthGuard);
