import type { NextApiRequest, NextApiResponse } from 'next';
import { CookieVerificationData } from '@typing/types';
import getFirebaseAdmin from '@utils/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const admin = await getFirebaseAdmin();
  const response: CookieVerificationData = {
    authenticated: false,
    usermail: ''
  };
  if (!admin) {
    res.status(500).send('Apologies. Invalid FirebaseSDK configuration detected.');
  }

  await admin
    .auth()
    .verifySessionCookie(req.body.token, true)
    .then((decodedClaims) => {
      response.authenticated = true;
      response.usermail = decodedClaims.email;
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      response.authenticated = false;
      res.status(403).json({ error: { ...response } });
    });
};
