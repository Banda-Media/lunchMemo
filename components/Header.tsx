import { FC, MutableRefObject, useRef } from 'react';
import { useAuth } from '../hooks/auth';

const Header: FC = () => {
  const navContent = useRef() as MutableRefObject<HTMLDivElement>;
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 fixed w-full z-10 top-0">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <a className="text-white no-underline hover:text-white hover:no-underline" href="/">
          <span className="text-2xl pl-2">
            <h1 className="lm-logo">
              <span className="lm-lunch">LUNCH</span>
              <span className="lm-memo">memo</span>
            </h1>
          </span>
        </a>
      </div>

      <div className="block lg:hidden">
        <button
          id="nav-toggle"
          onClick={() => navContent.current.classList.toggle('hidden')}
          className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>

      <div
        className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block pt-6 lg:pt-0"
        id="nav-content"
        ref={navContent}>
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <a className="inline-block py-2 px-4 text-white no-underline" href="/">
              Active
            </a>
          </li>

          {user && (
            <li className="mr-3">
              <a
                className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
                href="/profile">
                Profile
              </a>
            </li>
          )}
          <li className="mr-3">
            <a
              className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
              href="/">
              Home
            </a>
          </li>

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
        </ul>
      </div>
    </nav>
  );
};

export default Header;
