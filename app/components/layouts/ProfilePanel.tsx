import { CookieVerificationData } from '@typing/types';
import { useAuth } from '@hooks/AuthContext';

const ProfilePanel: React.FC<CookieVerificationData> = () => {
  const { user, logout } = useAuth();
  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register content-center flex flex-col space-y-5 p-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">Profile</h3>
        <img src={user?.photoURL || ''} alt="avatar" width="100" height="100" />
        <span>
          Welcome user <b>{user?.email}</b>
        </span>
        <button
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
          onClick={logout}>
          Sign out
        </button>
      </div>
    </section>
  );
};

export default ProfilePanel;
