import Layout from '@components/layouts/Layout';
import ProfilePanel from '@components/modules/main/profile/ProfilePanel';
import { withAuthGuard } from '@utils/authGuard';
import { CookieVerificationData } from '@typing/types';

const Profile: React.FC<CookieVerificationData> = (props) => (
  <Layout>
    <ProfilePanel {...props} />
  </Layout>
);
export default withAuthGuard(Profile);
