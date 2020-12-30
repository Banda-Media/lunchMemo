import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import getFirebaseAdmin from '../../app/utils/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const admin = await getFirebaseAdmin();

  const expiresIn = 5 * 60 * 1000; // 5 Minutes in ms

  if (req.method === 'POST') {
    const idToken = req.body.token;

    const sessionCookie: string | null = await admin
      .auth()
      .verifyIdToken(idToken, true)
      .then((decodedIdToken) => {
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          return admin.auth().createSessionCookie(idToken, { expiresIn });
        } else {
          res.status(401).send('Recent sign in required!');
          return null;
        }
      });

    if (sessionCookie) {
      console.log('secure:' + process.env.NEXT_PUBLIC_SECURE_COOKIE);
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_SECURE_COOKIE === 'true',
        path: '/'
      };
      res.setHeader('Set-Cookie', serialize('user', sessionCookie, options));
      res.status(200).end(JSON.stringify({ response: 'Succesfull logged in' }));
    } else {
      res.status(401).send('Invalid authentication');
    }
  }
};
