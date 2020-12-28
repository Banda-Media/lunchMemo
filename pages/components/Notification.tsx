import { FC, useEffect, useState } from 'react';

interface ChildProps {
  delay: number;
  message: string;
}

const Notification: FC<ChildProps> = ({ delay, message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, delay);
  }, [delay]);

  return visible ? (
    <div className="alert-banner w-full fixed top-0">
      <label
        className="close cursor-pointer flex items-center justify-between w-full p-2 bg-red-500 shadow text-white"
        title="close"
        htmlFor="banneralert">
        {message}
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18">
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
      <input type="checkbox" className="hidden" id="banneralert" />
    </div>
  ) : (
    <div />
  );
};

export default Notification;
