import firebase from 'firebase/app';
import { useForm } from 'react-hook-form';
import { CreateGroupFormData, LunchGroup, OneToManyRelationships } from '@typing/types';
import { formDefaults, GROUP_OPTIONS } from '@utils/constants';
import { useAuth } from '@hooks/AuthContext';
import { useLunchGroup } from '@hooks/LunchGroupContext';
import SubmitButton from '@common/forms/SubmitButton';
import TextInput from '@common/forms/TextInput';
import { Select } from '@common/forms/Generic';
import TimePicker from '@common/forms/TimePicker';
import { useNotify } from '@hooks/NotifyContext';

const setTime = (ampm: string, hours: string, minutes: string): Date => {
  const now = new Date();
  now.setHours(+hours + (ampm === 'pm' ? 12 : 0), +minutes, 0);
  return now;
};

const formToLunchGroup = (
  {
    name,
    starthours,
    startminutes,
    endhours,
    endminutes,
    endampm,
    startampm,
    groupSize
  }: CreateGroupFormData,
  user: firebase.User | null
): LunchGroup => {
  const userRef: OneToManyRelationships = user ? { [user.uid]: true } : {};
  const startTime = setTime(startampm, starthours, startminutes);
  const endTime = setTime(endampm, endhours, endminutes);
  return {
    name,
    groupSize,
    startTime,
    endTime,
    creator: userRef,
    users: userRef,
    active: true,
    foods: {}
  };
};

const CreateGroup: React.FC = () => {
  const form = useForm(formDefaults);
  const { addGroup } = useLunchGroup();
  const { notify } = useNotify();
  const { user } = useAuth();

  const onSubmit = async (formData: CreateGroupFormData) => {
    try {
      await addGroup(formToLunchGroup(formData, user));
      form.reset();
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col sm:flex-row items-center justify-center space-x-2 h-12">
        <TextInput
          form={form}
          name="name"
          className="h-full"
          placeholder="Group name"
          message="Must enter a group name"
        />
        <TimePicker className="h-full flex" prefix="start" form={form} />
        <TimePicker className="h-full flex" prefix="end" form={form} />
        <Select className="h-full px-2" form={form} name="groupSize" options={GROUP_OPTIONS} />
        <SubmitButton title="Create Group" disabled={!!form.errors.length} />
      </form>
    </div>
  );
};

export default CreateGroup;
