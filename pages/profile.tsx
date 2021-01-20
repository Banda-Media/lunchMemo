import Layout from '@components/layouts/Layout';
import ProfilePanel from '@components/modules/main/Profile/ProfilePanel';
import LunchGroupProvider from '@hooks/LunchGroupContext';
import withGuard, { authGuard } from '@utils/guards';

const Profile: React.FC = () => (
  <Layout>
    <LunchGroupProvider>
      <ProfilePanel />
    </LunchGroupProvider>
  </Layout>
);
export default withGuard(Profile, authGuard);
