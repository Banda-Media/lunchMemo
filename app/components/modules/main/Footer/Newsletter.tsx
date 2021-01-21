import EmailInput from '@common/forms/EmailInput';
import SubmitButton from '@common/forms/SubmitButton';
import { formDefaults } from '@utils/constants';
import { useForm } from 'react-hook-form';

const Newsletter: React.FC = () => {
  const form = useForm(formDefaults);
  return (
    <div className="sm:w-1/3 sm:mt-0 mt-8 h-auto">
      <div className="text-red-light mb-2">Newsletter</div>
      <p className="text-grey-darker leading-normal text-xs">
        Let's stay in touch! Subscribe to our VERY rare newsletter.
      </p>
      <div className="mt-4 flex">
        <EmailInput form={form} hasLabel={false} id="news-email" />
        <SubmitButton title="Subscribe" />
      </div>
    </div>
  );
};
export default Newsletter;
