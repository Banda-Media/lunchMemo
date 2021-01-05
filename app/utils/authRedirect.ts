import { GetServerSideProps } from 'next';
import Debug from 'debug';
import { parseCookies } from 'nookies';
import { createSessionToken, verifySessionToken } from '@utils/firebase/auth';
import { CookieVerificationData } from '@typing/types';
import { sessionTokenCookie, userTokenCookie } from './constants';

const debug = Debug('lunchmemo:utils:authRedirect');

const authRedirect: GetServerSideProps = async (context) => {
  debug('authRedirect Starting');
  const protocol = context.req.headers.referer?.split('://')[0];
  const host = context.req.headers?.host;
  const baseUrl = context.req ? `${protocol || 'http'}://${host}/api` : '';

  const props: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };

  const cookies = parseCookies(context);
  if (cookies[userTokenCookie]) {
    const response = await createSessionToken(baseUrl, cookies[userTokenCookie]);
    debug('Received session token creation response: %o', response);

    props.authenticated = !!response?.token;
    props.usermail = response?.user?.email || '';
  } else if (cookies[sessionTokenCookie]) {
    const response = await verifySessionToken(baseUrl, cookies[sessionTokenCookie]);
    debug('Received session token verification response: %o', response);

    props.usermail = response.usermail;
    props.authenticated = response.authenticated;
  }

  const { res } = context;
  if (!props.authenticated) {
    debug('No user cookie present...redirecting to login');
    res.setHeader('Location', '/login');
    res.statusCode = 302;
    res.end();
  }

  return { props };
};

export default authRedirect;
