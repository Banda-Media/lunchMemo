export interface AuthActionsProps {
  logout: () => void;
}

const AuthActions: React.FC<AuthActionsProps> = ({ logout }) => {
  return (
    <li className="mr-3">
      <button
        onClick={logout}
        className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4">
        Log out
      </button>
    </li>
  );
};
export default AuthActions;
