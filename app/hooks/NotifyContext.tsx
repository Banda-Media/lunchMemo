import { useState, createContext, useContext } from 'react';
import Debug from 'debug';
import { INotifyContext, Notification } from '@typing/types';

const debug = Debug('lunchmemo:hooks:NotifyContext');

const NotifyContext = createContext<INotifyContext>({
  notification: { message: '', timeout: 3000, timestamp: new Date() },
  notify: (message: string, timeout?: number) => console.log(message, timeout)
});

const NotifyProvider: React.FC = ({ children }) => {
  const [notification, setNotification] = useState<Notification>({
    message: '',
    timeout: 3000,
    timestamp: new Date()
  });
  debug('Loading NotifyProvider.');

  const notify = (message: string, timeout = 3000) => {
    console.log('running notify', message, timeout);
    setNotification({ message, timeout, timestamp: new Date() });
  };

  return (
    <NotifyContext.Provider value={{ notification, notify }}>{children}</NotifyContext.Provider>
  );
};

export const useNotify = (): INotifyContext => {
  return useContext(NotifyContext);
};

export default NotifyProvider;
