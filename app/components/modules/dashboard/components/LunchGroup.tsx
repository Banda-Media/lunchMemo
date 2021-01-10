import { LunchGroupProps } from '@typing/props';
import { useAuth } from '@hooks/AuthContext';
import JoinButton from './JoinButton';
import TimeRange from './TimeRange';
import { GoogleDate } from '@typing/types';
import AttendeesList from './AtendeesList';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import { useEffect, useState } from 'react';

const parseGroupSize = (groupSize: string): readonly [number, number] => {
  const matches = (groupSize.match(/\d+/g) || ['3', '5']).map((n: string) => parseInt(n));
  return [matches[0], matches[1]];
};

const LunchGroup: React.FC<LunchGroupProps> = ({
  group: { name, active, startTime, endTime, groupSize = '', creator = {}, foods = [], users = [] }
}) => {
  const { user } = useAuth();
  const { getUser } = useLunchGroup();
  const [owner, setOwner] = useState('');
  const [min, max] = parseGroupSize(groupSize);

  useEffect(() => {
    getUser && getUser(Object.keys(creator)[0]).then((user) => setOwner(user.email));
  }, [creator]);

  return (
    <div className={`flex flex-col bg-white w-full px-8 py-4 shadow ${active ? '' : 'opacity-50'}`}>
      <div className="flex flex-col">
        <div className="flex space-between items-center group-container flex justify-between">
          <div className="flex flex-col flex-1 space-y-1">
            <h3 className="hostname font-extrabold">{name}</h3>
            <AttendeesList users={Object.keys(users)} max={max} />
          </div>

          <div className="flex-1">
            <TimeRange flex-1 startTime={startTime as GoogleDate} endTime={endTime as GoogleDate} />
          </div>

          <div className="flex-none">
            <JoinButton
              onClick={() => null}
              uid={user?.uid || ''}
              users={Object.keys(users)}
              min={min}
              max={max}
            />
          </div>
        </div>
        <div className="flex py-2 text-xsm text-gray-200">
          <sub>{owner}</sub>
          <sub>{Object.keys(foods).join(' ')}</sub>
        </div>
      </div>
    </div>
  );
};
export default LunchGroup;
