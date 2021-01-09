import { PasswordInputProps } from '@typing/props';

const PasswordInput: React.FC<PasswordInputProps> = ({
  newPassword = false,
  form: { register, errors }
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor="password" className="text-sm font-semibold text-gray-500">
        Password
      </label>
      <input
        type="password"
        autoComplete={newPassword ? 'new-password' : 'current-password'}
        name="password"
        placeholder="********"
        ref={register({
          required: `Please enter your ${newPassword && 'new '}password`,
          minLength: { value: 6, message: 'Should have at least 6 characters' }
        })}
      />
      {errors.password && (
        <div className="mt-2 text-xs text-red-600">{errors.password.message}</div>
      )}
    </div>
  );
};

export default PasswordInput;
