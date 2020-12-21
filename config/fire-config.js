import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.LM_FIREBASE_API_KEY,
  authDomain: process.env.LM_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.LM_FIREBASE_DATABASE_URL,
  projectId: process.env.LM_FIREBASE_PROJECT_ID,
  storageBucket: process.env.LM_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.LM_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.LM_FIREBASE_APP_ID,
  measurementId: process.env.LM_FIREBASE_MEASUREMENT_ID
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const fire = firebase;
export default fire;
