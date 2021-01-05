import { CookieVerificationData } from '@typing/types';
import authRedirect from '@utils/authRedirect';
import ProfilePanel from '@components/layouts/ProfilePanel';
import Layout from '@components/layouts/Layout';

export const getServerSideProps = authRedirect;

const Profile: React.FC<CookieVerificationData> = (props) => {
  console.log('Loading profile...');
  return (
    <Layout>
      <ProfilePanel {...props} />
    </Layout>
  );
};

export default Profile;
