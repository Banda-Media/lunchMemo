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
const GROCERY = 'grocery';

try {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}

const auth = firebase.auth();
const db = firebase.firestore();
// const app = firebase.app();
// const now = firebase.firestore.Timestamp.now();
// const storage = firebase.storage();

export const createGroceryList = (userName, userId) => {
  return db.collection('groceryLists').add({
    created: firebase.firestore.FieldValue.serverTimestamp(),
    createdBy: userId,
    users: [
      {
        userId: userId,
        name: userName
      }
    ]
  });
};

export const getGroceryList = (groceryListId) => {
  return db.collection(GROCERY).doc(groceryListId).get();
};

export const getGroceryListItems = (groceryListId) => {
  return db.collection(GROCERY).doc(groceryListId).collection('items').get();
};

export const streamGroceryListItems = (groceryListId, observer) => {
  return db
    .collection(GROCERY)
    .doc(groceryListId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};

export const addUserToGroceryList = (userName, groceryListId, userId) => {
  return db
    .collection(GROCERY)
    .doc(groceryListId)
    .update({
      users: firebase.firestore.FieldValue.arrayUnion({
        userId: userId,
        name: userName
      })
    });
};

export const addGroceryListItem = (item, groceryListId, userId) => {
  return getGroceryListItems(groceryListId)
    .then((querySnapshot) => querySnapshot.docs)
    .then((groceryListItems) =>
      groceryListItems.find(
        (groceryListItem) => groceryListItem.data().name.toLowerCase() === item.toLowerCase()
      )
    )
    .then((matchingItem) => {
      if (!matchingItem) {
        return db.collection(GROCERY).doc(groceryListId).collection('items').add({
          name: item,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          createdBy: userId
        });
      }
      throw new Error('duplicate-item-error');
    });
};

export const addPost = ({ title, content }) => {
  return db.collection(BLOG).add({
    title: title,
    content: content
  });
};

export const getPost = (postId) => {
  return db.collection(BLOG).doc(postId).get();
};

export const getPosts = async () => {
  const snapshot = await db.collection(BLOG).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getPostItems = (postId) => {
  return getPost(postId).collection('items').get();
};

export const streamPostItems = (postId, observer) => {
  return db
    .collection(BLOG)
    .doc(postId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};

export const login = (username, password) => {
  return auth.signInWithEmailAndPassword(username, password);
};

export const logout = () => {
  return auth.signOut();
};

export const register = (username, password) => {
  return auth.createUserWithEmailAndPassword(username, password);
};

export const loginAnonymously = () => {
  return firebase.auth().signInAnonymously();
};

export default {
  blog: {
    addPost,
    getPostItems,
    getPosts,
    streamPostItems
  },
  grocery: {
    createGroceryList,
    getGroceryList,
    getGroceryListItems,
    streamGroceryListItems,
    addUserToGroceryList,
    addGroceryListItem
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
