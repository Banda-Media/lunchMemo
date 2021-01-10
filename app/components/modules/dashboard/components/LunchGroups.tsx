import LunchGroup from './LunchGroup';
import { useLunchGroup } from '@hooks/LunchGroupContext';

const LunchGroups: React.FC = () => {
  const { groups } = useLunchGroup();
  return (
    <ul className="w-full">
      {groups.map((group) => (
        <li className="pb-2" key={group.name}>
          <LunchGroup group={group} />
        </li>
      ))}
    </ul>
  );
};
export default LunchGroups;
