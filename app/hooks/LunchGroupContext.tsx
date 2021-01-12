import Debug from 'debug';
import { useState, createContext, useContext, useEffect } from 'react';
import getFirebase from '@services/firebase/firebase';
import { useNotify } from './NotifyContext';
import { ILunchGroupContext, LunchGroup, User } from '@typing/types';
import { USER_COLLECTION, GROUPS_COLLECTION } from '@utils/constants';

const debug = Debug('lunchmemo:hooks:LunchGroupContext');

const LunchGroupContext = createContext<ILunchGroupContext>({
  groups: [],
  loading: false
});

const { firestore } = getFirebase();

const LunchGroupProvider: React.FC = ({ children }) => {
  debug('Loading LunchGroupProvider.');
  const [groups, setLunchGroups] = useState<LunchGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotify();

  useEffect(() => {
    loadGroups();
    const unsubscribe = firestore.collection(GROUPS_COLLECTION).onSnapshot(
      (snapshot) => {
        const groups = snapshot.docs.map((doc) => doc.data() as LunchGroup);
        groups.map((group) => !Object.keys(group.users || []).length && removeGroup(group.name));
        setLunchGroups(groups);
        setLoading(false);
      },
      (err) => {
        notify(JSON.stringify(err));
      }
    );
    return () => unsubscribe();
  }, []);

  const getGroup = async (id: string): Promise<LunchGroup> => {
    setLoading(true);
    const group = (
      await firestore.collection(GROUPS_COLLECTION).doc(id).get()
    ).data() as LunchGroup;
    setLoading(false);
    return group;
  };

  const updateGroup = async (group: LunchGroup) => {
    setLoading(true);
    if (!group.users?.length) {
      removeGroup(group.name);
    }
    await firestore.collection(GROUPS_COLLECTION).doc(group.name).set(group);
    setLoading(false);
  };

  const addGroup = async (lunchGroup: LunchGroup): Promise<void> => {
    setLoading(true);
    await firestore.collection(GROUPS_COLLECTION).doc(lunchGroup.name).set(lunchGroup);
    setLoading(false);
  };

  const loadGroups = async (): Promise<void> => {
    setLoading(true);
    try {
      const snapshot = await firestore.collection(GROUPS_COLLECTION).get();
      const groups = snapshot.docs.map((doc) => doc.data() as LunchGroup);
      setLunchGroups(groups);
    } catch (err) {
      notify(JSON.stringify(err));
    }
    setLoading(false);
  };

  const removeGroup = async (id: string): Promise<void> => {
    setLoading(true);
    await firestore.collection(GROUPS_COLLECTION).doc(id).delete();
    setLoading(false);
  };

  const getUser = async (id: string): Promise<User> => {
    return (await firestore.collection(USER_COLLECTION).doc(id).get()).data() as User;
  };

  return (
    <LunchGroupContext.Provider
      value={{
        getGroup,
        groups,
        addGroup,
        updateGroup,
        loadGroups,
        removeGroup,
        getUser,
        loading
      }}>
      {children}
    </LunchGroupContext.Provider>
  );
};

export const useLunchGroup = (): ILunchGroupContext => {
  return useContext(LunchGroupContext);
};

export default LunchGroupProvider;
