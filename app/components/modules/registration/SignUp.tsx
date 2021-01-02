import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAuth } from '@hooks/AuthContext';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

const SignUpForm: React.FC = () => {
  const router = useRouter();
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

  const emailRegex = /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/gim;

  const onSubmit = ({ name, email, password }: SignUpData) => {
    registerUser(email, password, name, 'email-signup')
      .then(() => router.push('/'))
      .catch(console.log);
  };

  const registerThirdParty = (e: BaseSyntheticEvent | undefined) => {
    console.log(e);
    // @ts-ignore
    const { id } = e?.target.id; // eslint-disable-line no-eval
    const { email, password, name } = getValues();
    registerUser(email as string, password as string, name as string, id)
      .then(() => router.push('/'))
      .catch(console.log);
  };

  return (
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
          {errors.email && <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>}
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

        <span className="block pt-2  w-full rounded-md shadow-sm">
          <button
            id="github-signup"
            onClick={registerThirdParty}
            className="w-full inline-flex justify-center space-between items-center py-2 px-4 text-sm font-medium rounded-md bg-white text-red-500 hover:bg-gray-100 focus:outline-none focus:border-red-700 focus:shadow-outline-red border-solid border-2 border-red-500 transition duration-150 ease-in-out">
            <svg className="pr-14" height="16" viewBox="0 0 16 16" version="1.1" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            Sign up with Github
          </button>
        </span>

        <span className="block pt-2 w-full rounded-md shadow-sm">
          <button
            id="google-signup"
            onClick={registerThirdParty}
            className="w-full flex justify-center space-between items-center py-2 px-4 text-sm font-medium rounded-md text-red-500 bg-white hover:bg-gray-100 focus:outline-none focus:border-red-700 focus:shadow-outline-red border-solid border-2 border-red-500 transition duration-150 ease-in-out">
            <svg
              height="16"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
              className="pr-14">
              <path
                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                fill="#4285f4"
              />
              <path
                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                fill="#34a853"
              />
              <path
                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                fill="#fbbc04"
              />
              <path
                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                fill="#ea4335"
              />
            </svg>
            Sign up with Google
          </button>
        </span>
      </div>
    </form>
  );
};

export default SignUpForm;
