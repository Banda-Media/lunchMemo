import { RawUser } from '@typing/types';

const Profile: React.FC<{ user: RawUser }> = ({ user }) => (
  <div className="flex flex-col items-center justify-between">
    <img
      src={user?.photoURL || '/images/customer.png'}
      alt="avatar"
      className="mb-5 h-24 w-24 rounded-full"
    />
    <div className="flex flex-col  text-gray-600 dark:text-gray-400">
      <span>Welcome</span>
      <span className="mt-2 text-black dark:text-gray-200">{user?.email?.toLowerCase()}</span>
    </div>
  </div>
);
export default Profile;
