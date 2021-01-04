import Link from 'next/link';
import { useRouter } from 'next/router';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { ILogin } from '@typing/types';
import { emailRegex } from '@utils/firebase/auth';
import Socials from '@components/modules/registration/Socials';

const Login: React.FC = () => {
  const router = useRouter();
  const { login, loginProvider } = useAuth();
  const { register, errors, handleSubmit } = useForm<Record<string, unknown>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true
  });

  const onSubmit = ({ email, password }: ILogin) => {
    login(email, password)
      .then(() => router.push('/'))
      .catch(console.log);
  };

  const loginThirdParty = (e: BaseSyntheticEvent | undefined) => {
    const { id } = e?.target.id;
    loginProvider(id)
      .then(() => router.push('/'))
      .catch(console.log);
  };

  return (
    <div>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">Login</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-500">
            Email address
          </label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            placeholder="email"
            ref={register({
              required: 'Please enter an email',
              pattern: { value: emailRegex, message: 'Not a valid email' }
            })}
          />
          {errors.email && <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>}
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
            name="password"
            placeholder="********"
            ref={register({
              required: 'Please enter your password',
              minLength: { value: 6, message: 'Should have at least 6 characters' }
            })}
            className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">{errors.password.message}</div>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
          Log in
        </button>
      </form>

      <Socials message={'or log in with'} clickHandler={loginThirdParty} />

      <p className="mt-2 text-center text-md text-gray-600">
        don't have an account?
        <Link href="/signup">
          <span className="ml-2 text-blue-500 cursor-pointer">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
