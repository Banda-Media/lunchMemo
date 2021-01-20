import getFirebase from './firebase';
import { USER_COLLECTION, GROUPS_COLLECTION } from '@utils/constants';
import { LunchGroup, User, Observer, UnsubscribeCallback, FirestoreDoc } from '@typing/types';

export const { firestore } = getFirebase();

export const getDoc = async <T>(collection: string, id: string): Promise<T> => {
  return (await firestore.collection(collection).doc(id).get()).data() as T;
};

export const updateDoc = async <T>(
  collection: string,
  id: string,
  payload: T,
  merge = false
): Promise<void> => {
  return await firestore.collection(collection).doc(id).set(payload, { merge });
};

export const addDoc = async <T>(collection: string, payload: T): Promise<FirestoreDoc> => {
  return await firestore.collection(collection).add(payload);
};

export const removeDoc = async (collection: string, id: string): Promise<void> => {
  await firestore.collection(collection).doc(id).delete();
};

export const streamDoc = async (
  collection: string,
  id: string,
  observer: Observer
): Promise<UnsubscribeCallback> => {
  return await firestore
    .collection(collection)
    .doc(id)
    .collection('items')
    .orderBy('created')
    .onSnapshot(observer);
};

export const getUser = async (id: string): Promise<User> => {
  return await getDoc<User>(USER_COLLECTION, id);
};

export const getGroup = async (id: string): Promise<LunchGroup> => {
  return await getDoc<LunchGroup>(GROUPS_COLLECTION, id);
};

export const updateGroup = async (group: LunchGroup): Promise<void> => {
  if (!group.users?.length) {
    await removeGroup(group.name);
  } else {
    await updateDoc<LunchGroup>(GROUPS_COLLECTION, group.name, group);
  }
};

export const addGroup = async (group: LunchGroup): Promise<FirestoreDoc> => {
  return await addDoc(GROUPS_COLLECTION, group);
};

export const removeGroup = async (id: string): Promise<void> => {
  await removeDoc(GROUPS_COLLECTION, id);
};

export const streamGroupData = async (
  id: string,
  observer: Observer
): Promise<UnsubscribeCallback> => {
  return await streamDoc(GROUPS_COLLECTION, id, observer);
};
