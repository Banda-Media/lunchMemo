import { FormEvent, useState } from 'react';
import { login } from '@utils/firebase/auth';

// import Twitter from '../../../../public/images/logos/twitter.svg';

import { useRouter } from 'next/router';
import Link from 'next/link';
import Notification from '../../elements/Notification';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    login(username, password).catch((err: any) => {
      console.log(err.code, err.message);
      setNotification(err.message);
    });

    setUsername('');
    setPassword('');
    router.push('/');
  };

  return (
    <div>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">Login</h3>

      {notify ? <Notification delay={1000} message={notify} /> : null}

      <form onSubmit={handleLogin} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-500">
            Email address
          </label>
          <input
            id="email"
            type="text"
            autoComplete="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            // className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-gray-500">
              Password
            </label>
            <a href="/forgot" className="text-sm text-blue-600 hover:underline focus:text-blue-800">
              Forgot Password?
            </a>
          </div>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
          Login
        </button>
      </form>

      <div className="flex flex-col space-y-5">
        <span className="flex items-center justify-center space-x-2">
          <span className="h-px bg-gray-400 w-14"></span>
          <span className="font-normal text-gray-500">or login with</span>
          <span className="h-px bg-gray-400 w-14"></span>
        </span>

        <div className="flex flex-col space-y-4">
          <a
            href="/"
            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none">
            <span>
              <svg
                className="w-5 h-5 text-gray-800 fill-current group-hover:text-white"
                viewBox="0 0 16 16"
                version="1.1"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </span>
            <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
          </a>
          <a
            href="/"
            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
            <span>{/* <Twitter /> */}</span>
            <span className="text-sm font-medium text-blue-500 group-hover:text-white">
              Twitter
            </span>
          </a>
        </div>
      </div>

      <p className="mt-2 text-center text-md text-gray-600">
        {"don't have an account? "}
        <Link href="/signup">
          <button className="text-blue-500">Sign up</button>
        </Link>
      </p>
    </div>
  );
};

export default Login;
