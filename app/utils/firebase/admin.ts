import * as admin from 'firebase-admin';

const getFirebaseAdmin = async () => {
  if (!admin.apps.length) {
    await admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_LM_FIREBASE_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_LM_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.NEXT_PUBLIC_LM_FIREBASE_CLIENT_EMAIL
      }),
      databaseURL: process.env.NEXT_PUBLIC_LM_FIREBASE_DATABASE_URL
    });
  }

  return admin;
};

export default getFirebaseAdmin;
