import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@hooks/AuthContext';
import { ISignUpData } from '@typing/types';
import { emailRegex } from '@utils/constants';
import Socials from '@components/modules/registration/Socials';

const SignUpForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const { register, errors, handleSubmit, getValues } = useForm<Record<string, unknown>>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true
  });

  const onSubmit = ({ name, email, password }: ISignUpData) => {
    registerUser(email, password, name, 'email-signup');
  };

  const registerThirdParty = (e: BaseSyntheticEvent | undefined) => {
    const { id } = e?.target.id; // eslint-disable-line no-eval
    const { email, password, name } = getValues();
    registerUser(email as string, password as string, name as string, id);
  };

  return (
    <div>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">Sign Up</h3>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-md shadow-sm">
          <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
            Name
          </label>
          <input
            id="name"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="text"
            name="name"
            placeholder="Johnny Appleseed"
            autoComplete="nickname"
            ref={register({
              required: 'Please enter a name',
              maxLength: { value: 30, message: 'Name cannot be more than 30 characters' }
            })}
          />
          {errors.name && <div className="mt-2 text-xs text-red-600">{errors.name.message}</div>}
        </div>

        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
            Email address
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="email"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              type="email"
              name="email"
              placeholder="Johnny.Appleseed@cdpr.com"
              autoComplete="email"
              ref={register({
                required: 'Please enter an email',
                pattern: { value: emailRegex, message: 'Not a valid email' }
              })}
            />
            {errors.email && (
              <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
            Password
          </label>
          <div className="mt-1 rounded-md shadow-sm">
            <input
              id="password"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              type="password"
              name="password"
              placeholder="********"
              autoComplete="new-password"
              ref={register({
                required: 'Please enter a password',
                minLength: { value: 6, message: 'Should have at least 6 characters' }
              })}
            />
            {errors.password && (
              <div className="mt-2 text-xs text-red-600">{errors.password.message}</div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <span className="block pt-2 w-full rounded-md shadow-sm">
            <button
              id="email-signup"
              type="submit"
              disabled={!!Object.keys(errors).length}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 disabled:opacity-50 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-500 transition duration-150 ease-in-out">
              Sign up
            </button>
          </span>
        </div>
      </form>

      <Socials message={'or sign up with'} clickHandler={registerThirdParty} />

      <p className="mt-2 text-center text-md text-gray-600">
        already have an account?
        <Link href="/login">
          <span className="cursor-pointer ml-2 text-blue-500">Log in</span>
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
