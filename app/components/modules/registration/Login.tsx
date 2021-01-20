import { BaseSyntheticEvent } from 'react';
import Debug from 'debug';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { useNotify } from '@hooks/NotifyContext';
import { ILogin } from '@typing/types';
import { formDefaults } from '@utils/constants';
import Socials from '@components/modules/registration/Socials';
import EmailInput from '@common/forms/EmailInput';
import PasswordInput from '@common/forms/PasswordInput';
import SubmitButton from '@common/forms/SubmitButton';
import RegistrationFormLink from './components/RegistrationFormLink';
import { useRouter } from 'next/router';

const debug = Debug('lunchmemo:app:components:modules:registration:Login');
interface LoginRun {
  email?: string;
  password?: string;
  id?: 'google-signup' | 'github-signup';
}

const Login: React.FC = () => {
  const { login, loginProvider } = useAuth();
  const form = useForm(formDefaults);
  const { notify } = useNotify();
  const router = useRouter();

  const onSubmit = async ({ email, password }: ILogin) => {
    await runLogin({ email, password });
    router.push('/profile');
  };

  const loginThirdParty = async (e: BaseSyntheticEvent | undefined) => {
    const { id } = e?.target.id;
    await runLogin({ id });
  };

  const runLogin = async ({
    email = '',
    password = '',
    id = 'github-signup'
  }: LoginRun): Promise<void> => {
    try {
      email.length ? await login(email, password) : await loginProvider(id);
    } catch (err) {
      debug('Problem logging in: %o', err);
      notify(`Problem logging in: ${err?.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
        <EmailInput form={form} />
        <PasswordInput form={form} />
        <SubmitButton title="Log in" disabled={!!Object.keys(form.errors).length} />
      </form>
      <Socials message={'or log in with'} clickHandler={loginThirdParty} />
      <RegistrationFormLink url="/signup" prompt="don't have an account?" linkText="Sign up" />
    </div>
  );
};

export default Login;
