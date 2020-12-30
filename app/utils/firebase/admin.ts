import * as admin from 'firebase-admin';

const getFirebaseAdmin = async () => {
  if (!admin.apps.length) {
    await admin.initializeApp({
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
    });
  }

  return admin;
};

export default getFirebaseAdmin;
