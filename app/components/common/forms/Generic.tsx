import { SelectGenericProps, InputGenericProps } from '@typing/props';

export const Input: React.FC<InputGenericProps> = ({ form: { register }, name, ...rest }) => (
  <input name={name} ref={register} {...rest} />
);

export const Select: React.FC<SelectGenericProps> = ({
  form: { register },
  options,
  name,
  ...rest
}) => (
  <select name={name} ref={register} {...rest}>
    {options.map((value: string) => (
      <option key={value} value={value}>
        {value}
      </option>
    ))}
  </select>
);
