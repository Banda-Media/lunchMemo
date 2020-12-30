import 'firebase/auth';
import getFirebaseAdmin from './firebase/admin';

export interface CookieVerificationData {
  authenticated: boolean;
  usermail: string | undefined;
}

export default async (cookie: string): Promise<CookieVerificationData | null> => {
  const admin = await getFirebaseAdmin();
  if (!admin) {
    return null;
  }
  const response: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };

  await admin
    .auth()
    .verifySessionCookie(cookie, true)
    .then((decodedClaims) => {
      response.authenticated = true;
      response.usermail = decodedClaims.email;
    })
    .catch(() => {
      response.authenticated = false;
    });

  return response;
};
