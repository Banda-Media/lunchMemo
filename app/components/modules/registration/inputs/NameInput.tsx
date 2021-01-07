import { InputProps } from '@typing/props';

const NameInput: React.FC<InputProps> = ({ form: { register, errors } }) => {
  return (
    <div className="rounded-md shadow-sm">
      <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
        Name
      </label>
      <input
        id="name"
        type="text"
        name="name"
        placeholder="Johnny Appleseed"
        autoComplete="nickname"
        ref={register({
          required: 'Please enter a name',
          maxLength: { value: 30, message: 'Name cannot be more than 30 characters' }
        })}
      />
      {errors.name && <div className="mt-2 text-xs text-red-600">{errors.name.message}</div>}
    </div>
  );
};
export default NameInput;
