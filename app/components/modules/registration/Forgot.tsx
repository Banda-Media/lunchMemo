import { useForm } from 'react-hook-form';
import { useAuth } from '@hooks/AuthContext';
import { IForgot } from '@typing/types';
import EmailInput from './components/EmailInput';
import SubmitButton from './components/SubmitButton';
import Title from './components/Title';
import { formDefaults } from '@utils/constants';
import RegistrationFormLink from './components/RegistrationFormLink';

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
      <RegistrationFormLink url="/signup" prompt="don't have an account?" linkText="Sign up" />
    </div>
  );
};

export default Forgot;
