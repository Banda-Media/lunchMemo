import { OneToManyRelationships } from '@typing/types';

interface JoinButtonProps {
  onClick: (isMember: boolean) => void;
  uid: string;
  max: number;
  users: OneToManyRelationships;
  active: boolean;
}

const JoinButton: React.FC<JoinButtonProps> = ({ onClick, uid, users, max, active }) => {
  const isMember = uid in users;
  return (
    <div>
      <button
        onClick={() => onClick(isMember)}
        disabled={!active || (!isMember && Object.keys(users).length === max)}
        className={`join-leave btn ${isMember ? 'btn-leave' : 'btn-join'}`}>
        {isMember ? 'Leave' : 'Join'}
      </button>
    </div>
  );
};

export default JoinButton;
