import { useNotify } from '@hooks/NotifyContext';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import XSVG from '@styles/svg/x.svg';

const NotificationBar: React.FC = () => {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const banner = useRef() as MutableRefObject<HTMLDivElement>;
  const {
    notification: { message, timestamp, timeout }
  } = useNotify();

  useEffect(() => {
    if (message && message.length) {
      timer && clearTimeout(timer);
      banner.current.classList.remove(transitionClass);
      setTimer(
        setTimeout(() => {
          banner.current.classList.add(transitionClass);
        }, timeout)
      );
    }
  }, [message, timestamp]);

  const handleClick = () => banner.current.classList.add(transitionClass);
  const transitionClass = '-translate-y-10';

  return (
    <div
      className={`alert-banner w-full fixed transform transition-transform top-0 ${transitionClass}`}
      ref={banner}>
      <button className="w-full fill-current p-0 shadow bg-red-500" onClick={handleClick}>
        <label
          className="close cursor-pointer px-5 py-2 flex items-center justify-between w-full text-center text-white"
          title="close"
          htmlFor="banneralert">
          <span className="w-full text-center">{message}</span>
          <XSVG />
        </label>
      </button>
      <input type="checkbox" className="hidden" id="banneralert" />
    </div>
  );
};

export default NotificationBar;
