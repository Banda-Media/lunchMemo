const Newsletter: React.FC = () => {
  return (
    <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
      <div className="text-green-dark mb-2">My Makers</div>
      <ul className="list-reset leading-normal space-y-5">
        <li className="hover:text-green-dark text-grey-darker">
          <div className="flex whitespace-no-wrap text-sm leading-5 text-black-500">
            <img
              src="https://github.com/andresmweber.png?size=24"
              className="align-middle"
              alt="Andres Weber Avatar"
              height="24px"
              width="24px"
            />
            <span className="px-2 text-xs">Andres Weber</span>
          </div>
        </li>
        <li className="hover:text-green-light text-grey-darker">
          <div className="flex whitespace-no-wrap text-sm leading-5 text-black-500">
            <img
              src="https://github.com/bobbypwang.png?size=24"
              className="align-middle"
              alt="Bobby Wang Avatar"
              height="24px"
              width="24px"
            />
            <span className="px-2 text-xs">Bobby Wang</span>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default Newsletter;
