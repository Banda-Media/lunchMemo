import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import verifyCookie, { CookieVerificationData } from '../utils/verifyCookie';

const authRedirect: GetServerSideProps = async (context) => {
  const props: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };

  const cookies = parseCookies(context);
  const { res } = context;

  if (cookies.user) {
    const authentication = await verifyCookie(cookies.user);
    props.authenticated = authentication ? authentication.authenticated : false;
    props.usermail = authentication ? authentication.usermail : '';
  } else {
    console.log('No user cookie present...redirecting to login');
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return { props };
};

export default authRedirect;
