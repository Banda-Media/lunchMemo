import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { ISignUpData } from '@typing/types';
import Socials from '@components/modules/registration/Socials';
import { formDefaults } from '@utils/constants';
import NameInput from './components/NameInput';
import EmailInput from './components/EmailInput';
import PasswordInput from './components/PasswordInput';
import SubmitButton from './components/SubmitButton';
import Title from './components/Title';
import RegistrationFormLink from './components/RegistrationFormLink';

const SignUpForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const form = useForm(formDefaults);

  const onSubmit = ({ name, email, password }: ISignUpData) => {
    registerUser(email, password, name, 'email-signup');
  };

  const registerThirdParty = (e: BaseSyntheticEvent | undefined) => {
    const { id } = e?.target.id; // eslint-disable-line no-eval
    const { email, password, name } = form.getValues();
    registerUser(email as string, password as string, name as string, id);
  };

  return (
    <div>
      <Title label="Sign Up" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <NameInput form={form} />
        <EmailInput form={form} />
        <PasswordInput form={form} newPassword={true} />
        <SubmitButton title={'Sign up'} disabled={!!Object.keys(form.errors).length} />
      </form>
      <Socials message={'or sign up with'} clickHandler={registerThirdParty} />
      <RegistrationFormLink url="/login" prompt="already have an account?" linkText="Log in" />
    </div>
  );
};

export default SignUpForm;
