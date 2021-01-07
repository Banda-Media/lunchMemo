import { BaseSyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useAuth } from '@hooks/AuthContext';
import { ISignUpData } from '@typing/types';
import Socials from '@components/modules/registration/Socials';
import NameInput from './inputs/NameInput';
import EmailInput from './inputs/EmailInput';
import PasswordInput from './inputs/PasswordInput';
import SubmitButton from './inputs/SubmitButton';
import Title from './inputs/Title';

const SignUpForm: React.FC = () => {
  const { register: registerUser } = useAuth();
  const form = useForm<Record<string, unknown>>({
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
