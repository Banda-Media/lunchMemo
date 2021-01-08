import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { ILogin } from '@typing/types';
import Socials from '@components/modules/registration/Socials';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import SubmitButton from './components/SubmitButton';
import Title from './components/Title';
import { formDefaults } from '@utils/constants';
import RegistrationFormLink from './components/RegistrationFormLink';

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
      <RegistrationFormLink url="/signup" prompt="don't have an account?" linkText="Sign up" />
    </div>
  );
};

export default Login;
