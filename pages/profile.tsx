import { logout } from '../app/utils/firebase/auth';
import { CookieVerificationData } from '../app/utils/verifyCookie';
import authRedirect from './../app/utils/authRedirect';

export const getServerSideProps = authRedirect;

const User: React.FC<CookieVerificationData> = (props) => (
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
);

export default User;
