import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { backendVerifyUserToken } from '../../app/utils/firebase/auth';
import { CookieVerificationData } from '../../app/types/types.d';

const authRedirect: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0];
  const host = context.req.headers?.host;
  const baseUrl = context.req ? `${protocol || 'http'}://${host}/api` : '';
  console.log('HOST Detected:', baseUrl);

  const props: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };

  const cookies = parseCookies(context);
  const { res } = context;
  let redirect = false;

  if (cookies.user) {
    const authentication = await backendVerifyUserToken(baseUrl, cookies.user);

    if (authentication.error) {
      redirect = true;
    } else {
      console.log('AUTH: ', authentication);
      props.authenticated = authentication ? authentication.authenticated : false;
      props.usermail = authentication ? authentication.usermail : '';
    }
  } else {
    console.log('No user cookie present...redirecting to login');
    redirect = true;
  }

  if (redirect) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return { props };
};

export default authRedirect;
