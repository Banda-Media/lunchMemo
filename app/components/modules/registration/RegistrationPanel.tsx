import Login from '@components/modules/registration/Login';
import SignUp from '@components/modules/registration/SignUp';
import Forgot from '@components/modules/registration/Forgot';
import Logo from '@components/common/Logo';
import { useState, useEffect, ReactElement } from 'react';

const headingLookup: Map<string, string> = new Map([
  ['/login', 'Log in below to get started'],
  ['/signup', 'Create an account below to get started'],
  ['/forgot', 'Enter your email to reset your password']
]);
const componentLookup: Map<string, ReactElement> = new Map([
  ['/login', <Login />],
  ['/signup', <SignUp />],
  ['/forgot', <Forgot />]
]);

const RegistrationPanel: React.FC = () => {
  const [route, setRoute] = useState('');
  useEffect(() => {
    const pathName = window && window.location.pathname;
    setRoute(pathName);
  }, []);

  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register content-center ">
        <div className="left">
          <Logo />
          <p>
            Lunch Memo makes it easy to organize lunch with your colleagues and other professionals
            in your area. Spend less time finding lunch spots and scheduling with everyone and
            simplify your lunch life.
          </p>
        </div>
        <div className="right widget-login">
          <h3>
            <span>Hungry?</span>
            {headingLookup.get(route) || ''}
          </h3>
          {componentLookup.get(route) || <Login />}
        </div>
      </div>
    </section>
  );
};

export default RegistrationPanel;
