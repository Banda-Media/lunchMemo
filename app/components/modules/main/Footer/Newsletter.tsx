const Newsletter: React.FC = () => {
  return (
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
  );
};
export default Newsletter;
