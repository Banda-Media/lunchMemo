import Image from 'next/image';
import { SanitizedUsers } from '@typing/api';

export interface AttendeesListProps {
  users: SanitizedUsers;
  max: number;
  size: number;
  spacing: number;
}

const AttendeesList: React.FC<AttendeesListProps> = ({ users, max, size, spacing }) => (
  <div className="atendees">
    <ul className="attendee-list hidden sm:flex">
      {users.map((user) => (
        <li
          key={user.uid}
          className={`${user.uid?.length > 3 ? 'occupied' : 'empty'} px-${spacing}`}>
          {'photoURL' in user && user.photoURL ? (
            <Image
              src={user.photoURL}
              title={'email' in user ? user.email : 'unknown'}
              alt={`User avatar for ${user.uid}`}
              width={`${size}px`}
              height={`${size}px`}
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
