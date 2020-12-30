import { useState } from 'react';
import { useRouter } from 'next/router';

import Link from 'next/link';
import { register } from '../../../utils/firebase/auth';
import Notification from '../../elements/Notification';

const Register: React.FC = () => {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passConf, setPassConf] = useState('');
  const [notify, setNotification] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passConf) {
      setNotification('Password and password confirmation does not match');

      setPassword('');
      setPassConf('');
      return;
    }

    register(username, password).catch((err) => {
      console.log(err.code, err.message);
      setNotification(err.message);
    });

    router.push('/');
  };

  return (
    <div>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">Register</h3>

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
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-gray-500">
              Password
            </label>
          </div>
          <input
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <div className="flex flex-col space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-semibold text-gray-500">
              Confirm Password
            </label>
          </div>
          <input
            type="password"
            autoComplete="new-password"
            value={passConf}
            onChange={({ target }) => setPassConf(target.value)}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
          Sign Up
        </button>
      </form>

      <p className="mt-2 text-center text-md text-gray-600">
        already have an account?{' '}
        <Link href="/login">
          <button className="text-blue-500">Log in</button>
        </Link>
      </p>
    </div>
  );
};

export default Register;
