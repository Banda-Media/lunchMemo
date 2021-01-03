import { CookieVerificationData } from '@typing/types';
import authRedirect from '@utils/authRedirect';
import ProfilePanel from '@components/modules/profile/profilePanel';
import Layout from '@components/layouts/Layout';

export const getServerSideProps = authRedirect;

const Dashboard: React.FC<CookieVerificationData> = (props) => {
  return (
    <Layout>
      <ProfilePanel {...props} />
    </Layout>
  );
};

export default Dashboard;
