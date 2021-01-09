import { TimePickerProps } from '@typing/props';
import { Select } from './Generic';

const F_CLASS = 'appearance-none text-center px-1';
const HOURS = [...Array(12).keys()].map((n) => (n + 1).toString());

const TimePicker: React.FC<TimePickerProps> = ({ form, prefix, ...rest }) => (
  <div className="flex" {...rest}>
    <Select className={F_CLASS} form={form} name={`${prefix}hours`} options={HOURS} />
    <Select className={F_CLASS} form={form} name={`${prefix}minutes`} options={['00', '30']} />
    <Select className={F_CLASS} form={form} name={`${prefix}ampm`} options={['AM', 'PM']} />
  </div>
);

export default TimePicker;
