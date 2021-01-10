import { TimePickerProps } from '@typing/props';
import { Select } from './Generic';

const F_CLASS = 'appearance-none text-center px-1';
const HOURS = [...Array(12).keys()].map((n) => (n + 1).toString());

const TimePicker: React.FC<TimePickerProps> = ({ form, prefix, ...rest }) => (
  <div className="flex" {...rest}>
    {[
      { options: HOURS, label: 'hours' },
      { options: ['00', '30'], label: 'minutes' },
      { options: ['AM', 'PM'], label: 'ampm' }
    ].map(({ options, label }) => (
      <Select
        key={label}
        className={F_CLASS}
        form={form}
        name={`${prefix}${label}`}
        options={options}
      />
    ))}
  </div>
);

export default TimePicker;
