import ListItemLink from './ListItemLink';

const UnauthActions: React.FC = () => {
  return (
    <>
      <ListItemLink url="/login" label="Log in" />
      <ListItemLink url="/signup" label="Sign up" />
    </>
  );
};
export default UnauthActions;
