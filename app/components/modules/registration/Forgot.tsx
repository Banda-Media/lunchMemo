import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { IForgot } from '@typing/types';
import { emailRegex } from '@utils/constants';

const Forgot: React.FC = () => {
  const { forgot } = useAuth();
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

  const onSubmit = ({ email }: IForgot) => {
    forgot(email);
  };

  return (
    <div>
      <h3 className="my-4 text-2xl font-semibold text-gray-700">Forgot</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="text-sm font-semibold text-gray-500">
            Email address
          </label>
          <input
            id="email"
            type="text"
            autoComplete="email"
            name="email"
            placeholder="email"
            ref={register({
              required: 'Please enter an email',
              pattern: { value: emailRegex, message: 'Not a valid email' }
            })}
          />
          {errors.email && <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
          Send Email
        </button>
      </form>

      <p className="mt-2 text-center text-md text-gray-600">
        don't have an account?
        <Link href="/signup">
          <span className="ml-2 text-blue-500 cursor-pointer">Sign up</span>
        </Link>
      </p>
    </div>
  );
};

export default Forgot;
