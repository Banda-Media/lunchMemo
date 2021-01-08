import { emailRegex } from '@utils/constants';
import { InputProps } from '@typing/props';

const EmailInput: React.FC<InputProps> = ({ form: { register, errors } }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="email" className="text-sm font-semibold text-gray-500">
        Email address
      </label>
      <input
        id="email"
        type="text"
        autoComplete="email"
        name="email"
        placeholder="Johnny.Appleseed@cdpr.com"
        ref={register({
          required: 'Please enter an email',
          pattern: { value: emailRegex, message: 'Not a valid email' }
        })}
      />
      {errors.email && <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>}
    </div>
  );
};
export default EmailInput;
