import { GoogleDate } from '@typing/types';

export interface TimeRangeProps {
  startTime: GoogleDate;
  endTime: GoogleDate;
}

const localeOptions = { hour: '2-digit', minute: '2-digit' };

const TimeRange: React.FC<TimeRangeProps> = ({ startTime, endTime }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center">
      {[startTime, null, endTime].map((value) => {
        value ? (
          <span className="whitespace-nowrap">
            {new Date((value as GoogleDate).seconds).toLocaleTimeString([], localeOptions)}
          </span>
        ) : (
          <div>{' - '}</div>
        );
      })}
    </div>
  );
};
export default TimeRange;
