import { useAuth } from '@hooks/AuthContext';

const DashboardPanel: React.FC = () => {
  const { logout } = useAuth();
  return (
    <section className="bg-white md:w-3/4 lg:w-3/5 mx-auto register-login animated fadeInDown faster">
      <div className="register content-center flex flex-col space-y-5 p-10">
        <h3 className="my-4 text-2xl font-semibold text-gray-700">Dashboard</h3>
        <div>
          Dashboard Placeholder
          <button onClick={logout}>Sign out</button>
        </div>
      </div>
    </section>
  );
};

export default DashboardPanel;
