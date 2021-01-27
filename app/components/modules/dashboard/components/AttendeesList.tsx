import Image from 'next/image';
import { SanitizedUsers } from '@typing/api';

export interface AttendeesListProps {
  users: SanitizedUsers;
  max: number;
}

const AttendeesList: React.FC<AttendeesListProps> = ({ users, max }) => (
  <div className="atendees">
    <ul className="attendee-list hidden sm:flex">
      {users.map((user) => (
        <li key={user.uid} className={user.uid?.length > 3 ? 'occupied' : 'empty'}>
          {'photoURL' in user && user.photoURL ? (
            <Image
              src={user.photoURL}
              title={'email' in user ? user.email : 'unknown'}
              alt={`User avatar for ${user.uid}`}
              width="20px"
              height="20px"
            />
          ) : (
            <i title={'email' in user ? user.email : 'unknown'} className="fas fa-user-alt" />
          )}
        </li>
      ))}
    </ul>
    <span className="sm:hidden">{`${users.length}/${max}`}</span>
  </div>
);

export default AttendeesList;
