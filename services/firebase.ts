import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_LM_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_LM_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_LM_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_LM_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_LM_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_LM_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_LM_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_LM_FIREBASE_MEASUREMENT_ID
};

const BLOG = 'blog';

try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error(`Firebase initialization error ${err.message}`, err.stack);
  }
}

const auth = firebase.auth();
const db = firebase.firestore();
// const app = firebase.app();
// const now = firebase.firestore.Timestamp.now();
// const storage = firebase.storage();

type UnsubscribeCallback = () => void;
/* eslint-disable */
interface Observer {
  next?:
    | ((snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => void)
    | undefined;
  error?: ((error: firebase.firestore.FirestoreError) => void) | undefined;
  complete?: (() => void) | undefined;
}
/* eslint-enable */

interface PostPayload {
  title: string;
  content: string;
}
export const addPost = ({
  title,
  content
}: PostPayload): Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>> => {
  return db.collection(BLOG).add({
    title: title,
    content: content
  });
};

export const getPost = (
  postId: string
): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> => {
  return db.collection(BLOG).doc(postId).get();
};

export const getPosts = async (): Promise<firebase.firestore.DocumentData> => {
  const snapshot = await db.collection(BLOG).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getPostItems = (
  postId: string
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
  return db.collection(BLOG).doc(postId).collection('items').get();
};

export const streamPostItems = (postId: string, observer: Observer): UnsubscribeCallback => {
  return db
    .collection(BLOG)
    .doc(postId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};

export const login = (
  username: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  return auth.signInWithEmailAndPassword(username, password);
};

export const logout = (): Promise<void> => {
  return auth.signOut();
};

export const register = (
  username: string,
  password: string
): Promise<firebase.auth.UserCredential> => {
  return auth.createUserWithEmailAndPassword(username, password);
};

export const loginAnonymously = (): Promise<firebase.auth.UserCredential> => {
  return firebase.auth().signInAnonymously();
};

export default {
  blog: {
    addPost,
    getPostItems,
    getPosts,
    streamPostItems
  },
  user: {
    login,
    logout,
    register,
    loginAnonymously
  },
  auth,
  db
};
