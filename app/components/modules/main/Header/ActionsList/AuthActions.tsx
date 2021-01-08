import ListItemButton from './ListItemButton';
import { AuthActionsProps } from '@typing/props';

const AuthActions: React.FC<AuthActionsProps> = ({ logout }) => {
  return <ListItemButton click={logout} label="Log out" />;
};
export default AuthActions;
