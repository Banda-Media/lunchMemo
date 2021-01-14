import firebase from 'firebase-admin';

const getFirebaseAdmin = (): firebase.app.App => {
  if (!firebase.apps.length) {
    const admin = firebase.initializeApp({
      credential: firebase.credential.cert({
        projectId: process.env.NEXT_PUBLIC_LM_FIREBASE_PROJECT_ID,
        privateKey: process.env.NEXT_PUBLIC_LM_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        clientEmail: process.env.NEXT_PUBLIC_LM_FIREBASE_CLIENT_EMAIL
      }),
      databaseURL: process.env.NEXT_PUBLIC_LM_FIREBASE_DATABASE_URL
    });
    return admin;
  }
  throw new Error('Could not load firebase admin.');
};

export default getFirebaseAdmin;
