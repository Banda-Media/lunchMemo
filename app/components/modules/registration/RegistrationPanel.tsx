import Login from './Login';
import SignUp from './SignUp';

const RegistrationPanel: React.FC = () => {
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

        <div className="right widget-register">
          <h3>
            <span>Hungry?</span>Create an account below to get started
          </h3>
          <SignUp />
        </div>
        <div className="right widget-login hide">
          <h3>
            <span>Hungry?</span>Log in below to get connected
          </h3>
          <Login />
        </div>
      </div>
    </section>
  );
};

export default RegistrationPanel;
