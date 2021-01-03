import { CookieVerificationData } from '@typing/types';
import { useAuth } from '@hooks/AuthContext';

const ProfilePanel: React.FC<CookieVerificationData> = (props) => {
  const { logout } = useAuth();
  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register content-center">
        <div>
          {props.authenticated ? 'Welcome user ' + props.usermail : 'You are a guest'}
          <button
            onClick={async () => {
              await logout();
              window.location.href = '/';
            }}>
            Sign out
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfilePanel;
