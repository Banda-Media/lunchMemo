import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { ISignUpData } from '@typing/types';
import { formDefaults } from '@utils/constants';
import Socials from '@modules/registration/Socials';
import NameInput from '@common/forms/NameInput';
import EmailInput from '@common/forms/EmailInput';
import PasswordInput from '@common/forms/PasswordInput';
import SubmitButton from '@common/forms/SubmitButton';
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-5">
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
