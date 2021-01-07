import Link from 'next/link';
import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { ILogin } from '@typing/types';
import Socials from '@components/modules/registration/Socials';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import SubmitButton from './inputs/SubmitButton';
import Title from './inputs/Title';
import { formDefaults } from '@utils/constants';

const Login: React.FC = () => {
  const { login, loginProvider } = useAuth();
  const form = useForm(formDefaults);

  const onSubmit = ({ email, password }: ILogin) => {
    login(email, password);
  };

  const loginThirdParty = (e: BaseSyntheticEvent | undefined) => {
    const { id } = e?.target.id;
    loginProvider(id);
  };

  return (
    <div>
      <Title label="Login" />

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <EmailInput form={form} />
        <PasswordInput form={form} />
        <SubmitButton title="Log in" disabled={!!Object.keys(form.errors).length} />
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
