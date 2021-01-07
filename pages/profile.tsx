import { CookieVerificationData } from '@typing/types';
import authGuard from '@utils/authGuard';
import ProfilePanel from '@components/layouts/ProfilePanel';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Profile: React.FC<CookieVerificationData> = (props) => {
  const router = useRouter();
  useEffect(() => {
    console.log('Loading profile...');
    authGuard(router);
  }, []);

  return (
    <Layout>
      <ProfilePanel {...props} />
    </Layout>
  );
};

export default Profile;
