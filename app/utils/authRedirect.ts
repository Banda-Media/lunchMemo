import { GetServerSideProps } from 'next';
import Debug from 'debug';
import { parseCookies } from 'nookies';
import { backendVerifyUserToken } from '@utils/firebase/auth';
import { CookieVerificationData } from '@typing/types';

const debug = Debug('lunchmemo:utils:authRedirect');

const authRedirect: GetServerSideProps = async (context) => {
  const protocol = context.req.headers.referer?.split('://')[0];
  const host = context.req.headers?.host;
  const baseUrl = context.req ? `${protocol || 'http'}://${host}/api` : '';
  debug('HOST Detected:', baseUrl);

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
      debug('AUTH: ', authentication);
      props.authenticated = authentication ? authentication.authenticated : false;
      props.usermail = authentication ? authentication.usermail : '';
    }
  } else {
    redirect = true;
  }

  if (redirect) {
    debug('No user cookie present...redirecting to login');
    res.setHeader('Location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return { props };
};

export default authRedirect;
