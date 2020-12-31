import { FormEvent, useState } from 'react';
import { login } from '@utils/firebase/auth';

import TwitterSVG from '@styles/svg/twitter.svg';
import GithubSVG from '@styles/svg/github.svg';

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
              <GithubSVG />
            </span>
            <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
          </a>
          <a
            href="/"
            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
            <span>
              <TwitterSVG />
            </span>
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
