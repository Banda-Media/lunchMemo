import Layout from '@components/layouts/Layout';
import ProfilePanel from '@components/modules/main/Profile/ProfilePanel';
import withGuard, { authGuard } from '@utils/guards';

const Profile: React.FC = (props) => (
  <Layout>
    <ProfilePanel {...props} />
  </Layout>
);
export default withGuard(Profile, authGuard);
