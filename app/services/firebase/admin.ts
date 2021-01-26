import admin from 'firebase-admin';

const getFirebaseAdmin = (): admin.auth.Auth => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_LM_FIREBASE_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_LM_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.NEXT_PUBLIC_LM_FIREBASE_CLIENT_EMAIL
      }),
      databaseURL: process.env.NEXT_PUBLIC_LM_FIREBASE_DATABASE_URL
    });
  }
  try {
    return admin.auth();
  } catch (error) {
    throw new Error(`Could not initialize Firebase Admin, ${JSON.stringify(error)}`);
  }
};

export default getFirebaseAdmin;
