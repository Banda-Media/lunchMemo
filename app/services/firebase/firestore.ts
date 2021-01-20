import firebase from 'firebase/app';
import 'firebase/firestore';
import getFirebase from './firebase';
import { USER_COLLECTION, GROUPS_COLLECTION } from '@utils/constants';
import { LunchGroup, User, Observer, IPostPayload, UnsubscribeCallback } from '@typing/types';

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

export const getGroup = async (id: string): Promise<LunchGroup> => {
  return (await firestore.collection(GROUPS_COLLECTION).doc(id).get()).data() as LunchGroup;
};

export const updateGroup = async (group: LunchGroup): Promise<void> => {
  if (!group.users?.length) {
    removeGroup(group.name);
  }
  await firestore.collection(GROUPS_COLLECTION).doc(group.name).set(group);
};

export const addGroup = async (lunchGroup: LunchGroup): Promise<void> => {
  await firestore.collection(GROUPS_COLLECTION).doc(lunchGroup.name).set(lunchGroup);
};

export const removeGroup = async (id: string): Promise<void> => {
  await firestore.collection(GROUPS_COLLECTION).doc(id).delete();
};

export const getUser = async (id: string): Promise<User> => {
  return (await firestore.collection(USER_COLLECTION).doc(id).get()).data() as User;
};

export const streamPostItems = (postId: string, observer: Observer): UnsubscribeCallback => {
  return firestore
    .collection(BLOG)
    .doc(postId)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};
