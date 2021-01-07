const UnauthActions: React.FC = () => {
  return (
    <>
      <li className="mr-3">
        <a
          className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
          href="/login">
          Log in
        </a>
      </li>

      <li className="mr-3">
        <a
          className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
          href="/signup">
          Sign up
        </a>
      </li>
    </>
  );
};
export default UnauthActions;
