import { useState, createContext, useContext } from 'react';
import Debug from 'debug';
import { LunchGroupContext, LunchGroup } from '@typing/types';

const debug = Debug('lunchmemo:hooks:LunchGroupContext');

const LunchGroupContext = createContext<LunchGroupContext>({
  groups: [],
  addGroup: () => null,
  removeGroup: () => null
});

const LunchGroupProvider: React.FC = ({ children }) => {
  const [groups, setLunchGroups] = useState<LunchGroup[]>([]);
  debug('Loading LunchGroupProvider.');

  const addGroup = (
    name: string,
    foods: string[],
    startTime: string,
    endTime: number,
    groupSize: number
  ) => {
    setLunchGroups([...groups, { name, foods, startTime, endTime, groupSize }]);
  };

  const removeGroup = (name: string) => {
    setLunchGroups(groups.filter((group) => group.name !== name));
  };

  return (
    <LunchGroupContext.Provider value={{ groups, addGroup, removeGroup }}>
      {children}
    </LunchGroupContext.Provider>
  );
};

export const useLunchGroup = (): LunchGroupContext => {
  return useContext(LunchGroupContext);
};

export default LunchGroupProvider;
