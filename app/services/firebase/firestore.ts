import firebase from 'firebase/app';
import config from './config';
import { Observer, IPostPayload, UnsubscribeCallback } from '@typing/types';
import getFirebase from './firebase';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const { firestore } = getFirebase();

const BLOG = 'blog';

export const addPost = ({
  title,
  content
}: IPostPayload): Promise<
  firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
> => {
  return firestore.collection(BLOG).add({
    title: title,
    content: content
  });
};

export const getPost = (
  postId: string
): Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>> => {
  return firestore.collection(BLOG).doc(postId).get();
};

export const getPosts = async (): Promise<firebase.firestore.DocumentData> => {
  const snapshot = await firestore.collection(BLOG).get();
  return snapshot.docs.map((doc) => doc.data());
};

export const getPostItems = (
  postId: string
): Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>> => {
  return firestore.collection(BLOG).doc(postId).collection('items').get();
};

export const streamPostItems = (postId: string, observer: Observer): UnsubscribeCallback => {
  return firestore
    .collection(BLOG)
    .doc(postId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};
