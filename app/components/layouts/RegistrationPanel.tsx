import Login from '@components/modules/registration/Login';
import SignUp from '@components/modules/registration/SignUp';
import { useState, useEffect } from 'react';

const RegistrationPanel: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const pathName = window && window.location.pathname;
    setIsLogin(pathName === '/login');
  }, []);

  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register content-center ">
        <div className="left">
          <h1 className="lm-logo">
            <span className="lm-lunch">LUNCH</span>
            <span className="lm-memo">memo</span>
          </h1>
          <p>
            Lunch Memo makes it easy to organize lunch with your colleagues and other professionals
            in your area. Spend less time finding lunch spots and scheduling with everyone and
            simplify your lunch life.
          </p>
        </div>
        <div className="right widget-login">
          <h3>
            <span>Hungry?</span>
            {isLogin ? 'Log in ' : 'Create an account '} below to get started
          </h3>
          {isLogin ? <Login /> : <SignUp />}
        </div>
      </div>
    </section>
  );
};

export default RegistrationPanel;
