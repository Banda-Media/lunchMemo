import { useNotify } from '@hooks/NotifyContext';
import { useEffect, useState, useRef, MutableRefObject } from 'react';
import NotificationBarContents from './NotificationBarContents';

const NotificationBar: React.FC = () => {
  const [timer, setTimer] = useState<NodeJS.Timer | null>(null);
  const banner = useRef() as MutableRefObject<HTMLDivElement>;
  const {
    notification: { message, timestamp, timeout }
  } = useNotify();
  const handleClick = () => banner.current.classList.add(transitionClass);
  const transitionClass = '-translate-y-10';

  useEffect(() => {
    if (message?.length) {
      timer && clearTimeout(timer);
      banner.current.classList.remove(transitionClass);
      setTimer(setTimeout(() => banner.current.classList.add(transitionClass), timeout));
    }
  }, [message, timestamp]);

  return message.length ? (
    <div
      className={`alert-banner w-full fixed transform transition-transform top-0 ${transitionClass}`}
      ref={banner}>
      <NotificationBarContents message={message} onClick={handleClick} />
      <input type="checkbox" className="hidden" id="banneralert" />
    </div>
  ) : (
    <></>
  );
};

export default NotificationBar;
