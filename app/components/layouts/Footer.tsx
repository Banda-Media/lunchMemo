const Footer: React.FC = () => {
  return (
    <div className="container-fluid bg-white p-8">
      <div className="sm:flex mb-4">
        <div className="sm:w-1/4 h-auto">
          <div className="text-orange mb-2">Orange</div>
          <ul className="list-reset leading-normal">
            <li className="hover:text-orange text-grey-darker">One</li>
            <li className="hover:text-orange text-grey-darker">Two</li>
            <li className="hover:text-orange text-grey-darker">Three</li>
          </ul>
        </div>
        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div className="text-blue mb-2">Blue</div>
          <ul className="list-reset leading-normal">
            <li className="hover:text-blue text-grey-darker">One</li>
          </ul>

          <div className="text-blue-light mb-2 mt-4">Blue-light</div>
          <ul className="list-reset leading-normal">
            <li className="hover:text-blue-light text-grey-darker">One</li>
          </ul>
        </div>
        <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
          <div className="text-green-dark mb-2">Green-dark</div>
          <ul className="list-reset leading-normal">
            <li className="hover:text-green-dark text-grey-darker">One</li>
          </ul>

          <div className="text-green-light mb-2 mt-4">Green-light</div>
          <ul className="list-reset leading-normal">
            <li className="hover:text-green-light text-grey-darker">One</li>
          </ul>
        </div>
        <div className="sm:w-1/2 sm:mt-0 mt-8 h-auto">
          <div className="text-red-light mb-2">Newsletter</div>
          <p className="text-grey-darker leading-normal">
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
