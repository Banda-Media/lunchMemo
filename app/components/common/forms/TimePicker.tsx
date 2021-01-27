import { TimePickerProps } from '@typing/props';
import { Select } from './Generic';

const F_CLASS = 'appearance-none text-center px-1';
const HOURS = [...Array(12).keys()].map((n) => (n + 1).toString());
const OPTIONS: { options: [string, string][]; label: string }[] = [
  { options: HOURS.map((h) => [h, h]), label: 'hours' },
  {
    options: [
      ['00', '00'],
      ['20', '30']
    ],
    label: 'minutes'
  },
  {
    options: [
      ['AM', 'AM'],
      ['PM', 'PM']
    ],
    label: 'ampm'
  }
];

const TimePicker: React.FC<TimePickerProps> = ({ form, prefix, ...rest }) => (
  <div {...rest}>
    <div className="flex bg-white px-2">
      {OPTIONS.map(({ options, label }) => (
        <Select
          key={label}
          className={F_CLASS}
          form={form}
          name={`${prefix}${label}`}
          options={options}
        />
      ))}
    </div>
  </div>
);

export default TimePicker;
