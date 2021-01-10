export interface AttendeesListProps {
  users: string[];
  max: number;
}

const AttendeesList: React.FC<AttendeesListProps> = ({ users, max }) => {
  return (
    <div className="atendees">
      <ul className="attendee-list hidden sm:flex">
        {users
          .concat(Array.from({ length: max }, (_, k) => (k + 1).toString()))
          .slice(0, max)
          .map((uid) => (
            <li key={uid} className={uid?.length > 3 ? 'occupied' : 'empty'}>
              <i className="fas fa-user-alt" />
            </li>
          ))}
      </ul>
      <span className="sm:hidden">{`${users.length}/${max}`}</span>
    </div>
  );
};
export default AttendeesList;
