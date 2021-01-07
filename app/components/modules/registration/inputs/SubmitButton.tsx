import { SubmitButtonProps } from '@typing/props';

const SubmitButton: React.FC<SubmitButtonProps> = ({ title, disabled = false }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4">
      {title}
    </button>
  );
};
export default SubmitButton;
