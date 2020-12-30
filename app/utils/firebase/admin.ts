import * as admin from 'firebase-admin';

const getFirebaseAdmin = async () => {
  if (!admin.apps.length) {
    await admin.initializeApp();
  }

  return admin;
};

export default getFirebaseAdmin;
