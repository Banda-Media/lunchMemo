import { useAuth } from '@hooks/AuthContext';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import Profile from './Profile';
import MyGroups from './MyGroups';

const ProfilePanel: React.FC = () => {
  const { user, logout } = useAuth();
  const { groups } = useLunchGroup();
  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register text-center content-center flex flex-col space-y-5 p-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">Profile</h3>
        <Profile user={user} />
        <MyGroups groups={groups} user={user} />
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
