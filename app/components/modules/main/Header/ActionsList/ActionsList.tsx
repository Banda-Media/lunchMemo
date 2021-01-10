import AuthActions from './AuthActions';
import UnauthActions from './UnauthActions';
import DefaultActions from './DefaultActions';
import UserActions from './UserActions';
import { useAuth } from '@hooks/AuthContext';
import { MutableRefObject } from 'react';

export interface ActionsListProps {
  navContent: MutableRefObject<HTMLDivElement>;
}

const ActionsList: React.FC<ActionsListProps> = ({ navContent }) => {
  const { user, logout } = useAuth();
  return (
    <div
      className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
      id="nav-content"
      ref={navContent}>
      <ul className="list-reset lg:flex justify-end flex-1 items-center">
        {user && <UserActions />}
        <DefaultActions />
        {user ? <AuthActions logout={logout} /> : <UnauthActions />}
      </ul>
    </div>
  );
};
export default ActionsList;
