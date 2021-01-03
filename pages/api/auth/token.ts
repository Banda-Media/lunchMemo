import type { NextApiRequest, NextApiResponse } from 'next';
import Debug from 'debug';
import { serialize } from 'cookie';
import getFirebaseAdmin from '@utils/firebase/admin';

const debug = Debug('lunchmemo:api:auth:token');

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  debug('Starting ID token verification');
  const admin = await (await getFirebaseAdmin()).auth();
  const expiresIn = 5 * 60 * 1000; // 5 Minutes in ms

  if (req.method === 'POST') {
    const idToken = req.body.token;
    debug('incoming token: %o', idToken);
    const sessionCookie: string | null = await admin
      .verifyIdToken(idToken, true)
      .then((decodedIdToken) => {
        debug('decoded token: %o', decodedIdToken);
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          return admin.createSessionCookie(idToken, { expiresIn });
        } else {
          res.status(401).send('Recent sign in required!');
          return null;
        }
      });

    if (sessionCookie) {
      debug('secure:  %s', process.env.NEXT_PUBLIC_SECURE_COOKIE);
      debug('Generated cookie:  %o', sessionCookie);
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
