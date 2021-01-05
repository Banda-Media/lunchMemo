import type { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import { CookieVerificationData } from '@typing/types';
import getFirebaseAdmin from '@utils/firebase/admin';

const debug = Debug('lunchmemo:api:auth:verify');

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  debug('Starting session token verification');
  const admin = await getFirebaseAdmin();
  const response: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };

  if (!admin) {
    res.status(500).json({ errors: 'Invalid FirebaseSDK configuration detected.' });
  }

  if (req.method === 'POST') {
    await admin
      .auth()
      .verifySessionCookie(req.body.token, true)
      .then((decodedClaims) => {
        response.authenticated = true;
        response.usermail = decodedClaims.email;
        res.status(200).json(response);
      })
      .catch((err) => {
        debug('Token Verification Failed: %o', err);
        response.authenticated = false;
        res.status(403).json({ message: { ...response }, errors: { ...err } });
      });
  }
};
