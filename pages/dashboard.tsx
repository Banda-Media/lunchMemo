import { CookieVerificationData } from '../app/types/types.d';
import authRedirect from '../app/utils/authRedirect';
import ProfilePanel from '../app/components/modules/profile/profilePanel';
import Layout from '../app/components/layouts/Layout';

export const getServerSideProps = authRedirect;

const Dashboard: React.FC<CookieVerificationData> = (props) => {
  return (
    <Layout>
      <ProfilePanel {...props} />
    </Layout>
  );
};

export default Dashboard;
