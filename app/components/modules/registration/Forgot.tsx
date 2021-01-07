import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { IForgot } from '@typing/types';
import EmailInput from './inputs/EmailInput';
import SubmitButton from './inputs/SubmitButton';
import Title from './inputs/Title';
import { formDefaults } from '@utils/constants';

const Forgot: React.FC = () => {
  const { forgot } = useAuth();
  const form = useForm(formDefaults);
  const onSubmit = ({ email }: IForgot) => forgot(email);

  return (
    <div>
      <Title label="Forgot" />

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <EmailInput form={form} />
        <SubmitButton title="Send Email" disabled={!!Object.keys(form.errors).length} />
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
