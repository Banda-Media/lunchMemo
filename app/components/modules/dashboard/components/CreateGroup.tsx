import { useForm } from 'react-hook-form';
import { CreateGroupFormData, LunchGroup, OneToManyRelationships } from '@typing/types';
import { formDefaults, GROUP_OPTIONS } from '@utils/constants';
import { useAuth } from '@hooks/AuthContext';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import SubmitButton from '@components/common/forms/SubmitButton';
import TextInput from '@components/common/forms/TextInput';
import { Select } from '@components/common/forms/Generic';
import TimePicker from '@components/common/forms/TimePicker';

const setTime = (ampm: string, hours: string, minutes: string): Date => {
  const now = new Date();
  now.setHours(+hours + (ampm === 'pm' ? 12 : 0), +minutes, 0);
  return now;
};

const CreateGroup: React.FC = () => {
  const form = useForm(formDefaults);
  const { addGroup } = useLunchGroup();
  const { user } = useAuth();
  const onSubmit = ({
    name,
    starthours,
    startminutes,
    endhours,
    endminutes,
    endampm,
    startampm,
    groupSize
  }: CreateGroupFormData) => {
    const userRef: OneToManyRelationships = user ? { [user.uid]: true } : {};
    const startTime = setTime(startampm, starthours, startminutes);
    const endTime = setTime(endampm, endhours, endminutes);
    const lunchGroup: LunchGroup = {
      name,
      groupSize,
      startTime,
      endTime,
      creator: userRef,
      users: userRef,
      active: true,
      foods: {}
    };
    addGroup && addGroup(lunchGroup);
  };

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center space-x-2 h-10">
        <TextInput
          form={form}
          name="name"
          className="h-full"
          placeholder="Group name"
          message="Must enter a group name"
        />
        <TimePicker className="h-full flex" prefix="start" form={form} />
        <TimePicker className="h-full flex" prefix="end" form={form} />
        <Select className="h-full" form={form} name="groupSize" options={GROUP_OPTIONS} />
        <div className="flex-auto h-full">
          <SubmitButton title="Create Group" disabled={!!form.errors.length} />
        </div>
      </form>
    </div>
  );
};

export default CreateGroup;
