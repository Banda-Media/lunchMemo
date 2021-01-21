import { RawUser, LunchGroup as LunchGroupType } from '@typing/types';
import LunchGroup from '@modules/dashboard/components/LunchGroup';

const MyGroups: React.FC<{ user: RawUser; groups: LunchGroupType[] }> = ({ user, groups }) => (
  <div className="flex flex-col items-center justify-between">
    <div className="flex flex-col  text-gray-600 dark:text-gray-400">
      <span>My Groups</span>
      {groups
        .filter((group) => group.users && (user?.uid || '') in group?.users)
        .map((group) => (
          <LunchGroup key={group.name} group={group} />
        ))}
    </div>
  </div>
);
export default MyGroups;
