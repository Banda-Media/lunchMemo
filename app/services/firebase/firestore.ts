import getFirebase from './firebase';
import { USER_COLLECTION, GROUPS_COLLECTION } from '@utils/constants';
import { ILunchGroup, User, Observer, UnsubscribeCallback } from '@typing/types';

export const { firestore } = getFirebase();

export const docIsUnique = async (
  collection: string,
  key: string,
  expectedValue: string
): Promise<boolean> => {
  const citiesRef = firestore.collection(collection);
  const snapshot = await citiesRef.where(key, '==', expectedValue).get();
  return snapshot.empty;
};

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

export const addDoc = async <T>(collection: string, payload: T): Promise<void> => {
  const id = firestore.collection(collection).doc().id;
  return await firestore
    .collection(collection)
    .doc(id)
    .set({ uid: id, ...payload });
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

export const getGroup = async (id: string): Promise<ILunchGroup> => {
  return await getDoc<ILunchGroup>(GROUPS_COLLECTION, id);
};

export const updateGroup = async (group: ILunchGroup): Promise<void> => {
  if (group.uid) {
    if (!Object.keys(group.users || {}).length) {
      await removeGroup(group.uid);
    } else {
      await updateDoc<ILunchGroup>(GROUPS_COLLECTION, group.uid, group);
    }
  }
};

export const addGroup = async (group: ILunchGroup): Promise<void> => {
  if (await docIsUnique(GROUPS_COLLECTION, 'name', group.name)) {
    return await addDoc(GROUPS_COLLECTION, group);
  }
  throw new Error(`Group ${group.name} already exists.`);
};

export const removeGroup = async (id: string): Promise<void> =>
  await removeDoc(GROUPS_COLLECTION, id);

export const streamGroupData = async (
  id: string,
  observer: Observer
): Promise<UnsubscribeCallback> => {
  return await streamDoc(GROUPS_COLLECTION, id, observer);
};
