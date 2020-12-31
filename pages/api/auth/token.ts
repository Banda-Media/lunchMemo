import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import getFirebaseAdmin from '../../../app/utils/firebase/admin';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const admin = await (await getFirebaseAdmin()).auth();
  const expiresIn = 5 * 60 * 1000; // 5 Minutes in ms

  if (req.method === 'POST') {
    const idToken = req.body.token;
    console.log(idToken);
    const sessionCookie: string | null = await admin
      .verifyIdToken(idToken, true)
      .then((decodedIdToken) => {
        console.log('decoded token: ', decodedIdToken);
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          return admin.createSessionCookie(idToken, { expiresIn });
        } else {
          res.status(401).send('Recent sign in required!');
          return null;
        }
      });

    if (sessionCookie) {
      console.log('secure:' + process.env.NEXT_PUBLIC_SECURE_COOKIE);
      console.log(sessionCookie);
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_SECURE_COOKIE === 'true',
        path: '/'
      };
      res.setHeader('Set-Cookie', serialize('user', sessionCookie, options));
      res.status(200).json({ response: 'Succesfull logged in' });
    } else {
      res.status(401).json({ response: 'Invalid authentication' });
    }
  }
};