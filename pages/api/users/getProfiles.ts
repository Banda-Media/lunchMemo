import Debug from 'debug';
import type { NextApiRequest, NextApiResponse } from 'next';
import getFirebaseAdmin from '@services/firebase/admin';

const debug = Debug('lunchmemo:api:getUserProfiles');
export interface GetUserProfilesRequest extends NextApiRequest {
  body: {
    uids: string;
  };
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const admin = await getFirebaseAdmin();
  debug('firebase admin object: %O', admin);

  if (req.method === 'POST') {
    const { uids } = req.body;
    try {
      const userProfilePromises = uids.map(async (uid: string) => await admin.auth().getUser(uid));
      const profiles = await Promise.allSettled(userProfilePromises);
      debug(profiles);
      res.status(200).end(JSON.stringify({ profiles }));
    } catch (error) {
      res
        .status(500)
        .send(JSON.stringify({ message: 'There was a problem retrieving user profiles', error }));
    }
  }
};
