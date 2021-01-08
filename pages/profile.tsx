import Layout from '@components/layouts/Layout';
import ProfilePanel from '@components/modules/main/profile/ProfilePanel';
import { CookieVerificationData } from '@typing/types';
import withGuard, { authGuard } from '@utils/guards';

const Profile: React.FC<CookieVerificationData> = (props) => (
  <Layout>
    <ProfilePanel {...props} />
  </Layout>
);
export default withGuard(Profile, authGuard);
