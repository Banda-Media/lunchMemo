const Footer: React.FC = () => {
  return (
    <div className="container-fluid bg-white text-sm px-12 py-6">
      <div className="sm:flex justify-between">
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

        <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
          <div className="text-red-light mb-2">Newsletter</div>
          <p className="text-grey-darker leading-normal text-xs">
            Let's stay in touch! Subscribe to our VERY rare newsletter.
          </p>
          <div className="mt-4 flex">
            <input
              type="text"
              className="m-0 p-2 border border-grey-light round text-grey-dark text-sm h-auto"
              placeholder="Your email address"
            />
            <button className="w-1/2 flex ml-2 justify-center border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
