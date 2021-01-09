import { TextInputProps } from '@typing/props';

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  message,
  form: { register, errors },
  autocomplete = null,
  ...rest
}) => {
  return (
    <div className="flex flex-col space-y-1" {...rest}>
      {label && (
        <label htmlFor={name} className="text-sm font-semibold text-gray-500">
          {label}
        </label>
      )}
      <input
        id={name}
        type="text"
        autoComplete={autocomplete || ''}
        name={name}
        className="h-full"
        placeholder={placeholder}
        ref={register({ required: message })}
      />
      {name in errors && <div className="mt-2 text-xs text-red-600">{errors[name]?.message}</div>}
    </div>
  );
};
export default TextInput;
