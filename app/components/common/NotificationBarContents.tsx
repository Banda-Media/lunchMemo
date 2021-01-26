import XSVG from '@styles/svg/x.svg';
import { NotificationBarContentsProps } from '@typing/props';

const NotifcationBarContents: React.FC<NotificationBarContentsProps> = ({ message, onClick }) => (
  <button className="w-full fill-current m-0 p-0 shadow bg-red-500" onClick={onClick}>
    <label
      className="close cursor-pointer px-5 py-2 flex items-center justify-between w-full text-center text-white"
      title="close"
      htmlFor="banneralert">
      <span className="w-full text-center">{message}</span>
      <XSVG />
    </label>
  </button>
);
export default NotifcationBarContents;
