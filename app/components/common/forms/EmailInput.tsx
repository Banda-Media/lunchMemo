import { emailRegex } from '@utils/constants';
import { InputProps } from '@typing/props';

const EmailInput: React.FC<InputProps> = ({
  form: { register, errors },
  hasLabel = true,
  id = 'email'
}) => {
  return (
    <div className="flex flex-col justify-center w-full space-y-1">
      {hasLabel && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-500">
          Email address
        </label>
      )}
      <input
        id={id}
        type="text"
        autoComplete="email"
        name="email"
        placeholder="Johnny.Appleseed@cdpr.com"
        ref={register({
          required: 'Please enter an email',
          pattern: { value: emailRegex, message: 'Not a valid email' }
        })}
      />
      {errors[id] && <div className="mt-2 text-xs text-red-600">{errors[id]?.message}</div>}
    </div>
  );
};
export default EmailInput;
