import { OneToManyRelationships } from '@typing/types';
import { capitalize } from '@utils/helpers';

interface JoinButtonProps {
  onClick: (isMember: boolean) => void;
  uid: string;
  max: number;
  users: OneToManyRelationships;
  active: boolean;
}

const JoinButton: React.FC<JoinButtonProps> = ({ onClick, uid, users, max, active }) => {
  const isMember = uid in users;
  const isFull = !active || (!isMember && Object.keys(users).length === max);
  const stateName = isMember ? 'leave' : isFull ? 'full' : 'join';
  const btnClass = `btn-${stateName}`;
  return (
    <div>
      <button
        onClick={() => onClick(isMember)}
        disabled={isFull}
        className={`join-leave btn ${btnClass}`}>
        {capitalize(stateName)}
      </button>
    </div>
  );
};

export default JoinButton;
