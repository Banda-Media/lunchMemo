import { useAuth } from '@hooks/AuthContext';

const ProfilePanel: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register text-center content-center flex flex-col space-y-5 p-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">Profile</h3>

        <div className="flex flex-col items-center justify-between">
          <img
            src={user?.photoURL || '/images/customer.png'}
            alt="avatar"
            className="mb-5 h-24 w-24 rounded-full"
          />
          <div
            className="flex flex-col  text-gray-600
						dark:text-gray-400">
            <span>Welcome</span>
            <span className="mt-2 text-black dark:text-gray-200">{user?.email?.toLowerCase()}</span>
          </div>
        </div>

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
