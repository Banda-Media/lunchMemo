import Debug from 'debug';
import { useState, createContext, useContext, useEffect } from 'react';
import getFirebase from '@services/firebase/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { ILunchGroupContext, LunchGroup } from '@typing/types';
import { GROUPS_COLLECTION } from '@utils/constants';
import { useNotify } from './NotifyContext';
import {
  getGroup,
  addGroup,
  updateGroup,
  removeGroup,
  getUser
} from '@services/firebase/firestore';
import { getProfiles } from '@services/api/users';

const debug = Debug('lunchmemo:hooks:LunchGroupContext');

const LunchGroupContext = createContext<ILunchGroupContext>({
  groups: [],
  loading: false,
  getGroup,
  addGroup,
  updateGroup,
  removeGroup,
  getUser,
  getProfiles
});

const { firestore } = getFirebase();

const LunchGroupProvider: React.FC = ({ children }) => {
  debug('Loading LunchGroupProvider.');
  const [groups, setLunchGroups] = useState<LunchGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const { notify } = useNotify();

  const storeGroups = async (
    snapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>
  ): Promise<void> => {
    setLoading(true);
    const groups = snapshot.docs.map((doc) => doc.data() as LunchGroup);
    groups.map((group) => !Object.keys(group.users || []).length && removeGroup(group.name));
    setLunchGroups(groups);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = firestore.collection(GROUPS_COLLECTION).onSnapshot(storeGroups, (err) => {
      notify(JSON.stringify(err));
    });
    return () => unsubscribe();
  }, []);

  return (
    <LunchGroupContext.Provider
      value={{
        getGroup,
        groups,
        addGroup,
        updateGroup,
        removeGroup,
        getUser,
        getProfiles,
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
