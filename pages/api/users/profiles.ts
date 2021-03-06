import firebase from 'firebase-admin';
import Debug from 'debug';
import type { NextApiRequest, NextApiResponse } from 'next';
import getFirebaseAdmin from '@services/firebase/admin';
import { SanitizedUsers, SanitizedUser } from '@typing/api';

const debug = Debug('lunchmemo:api:getUserProfiles');
const admin = getFirebaseAdmin();

const sanitizeUser = ({
  uid,
  email,
  emailVerified,
  displayName,
  photoURL,
  disabled
}: firebase.auth.UserRecord): SanitizedUser => {
  return { uid, email, emailVerified, displayName, photoURL, disabled };
};

const sanitizeProfiles = (
  users: PromiseSettledResult<firebase.auth.UserRecord>[],
  uids: string
): SanitizedUsers => {
  return users.map((user, i) => {
    return user.status === 'fulfilled'
      ? sanitizeUser(user.value)
      : { uid: uids[i], error: user.reason };
  });
};

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method === 'POST') {
    const { uids } = req.body;
    try {
      const userProfilePromises = uids.map(async (uid: string) => await admin.getUser(uid));
      const profiles = sanitizeProfiles(
        await Promise.allSettled<firebase.auth.UserRecord[]>(userProfilePromises),
        uids
      );
      const numErrors = profiles.filter((p) => 'error' in p).length;
      debug(`Gathered ${profiles.length} profiles with ${numErrors} errored profiles`);
      res.status(200).json({ profiles });
    } catch (error) {
      res.status(500).json({ message: 'There was a problem retrieving user profiles', error });
    }
  }
};
