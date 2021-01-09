interface JoinButtonProps {
  onClick: () => void;
  uid: string;
  min: number;
  max: number;
  users: string[];
}

const JoinButton: React.FC<JoinButtonProps> = ({ onClick, uid, users }) => {
  return (
    <div>
      <button onClick={onClick} className="join-leave btn btn-join">
        {uid in users ? 'Join' : 'Leave'}
      </button>
    </div>
  );
};

export default JoinButton;
