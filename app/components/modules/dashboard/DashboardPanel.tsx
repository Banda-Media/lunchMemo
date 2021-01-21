import CreateGroup from './components/CreateGroup';
import LunchGroups from './components/LunchGroups';

const DashboardPanel: React.FC = () => {
  return (
    <section className="mx-auto w-full h-full animated fadeInDown faster">
      <div className="h-full flex flex-col justify-start mx-auto items-center space-y-5 p-10">
        <h2 className="w-full large-title text-center">start a lunch group</h2>
        <CreateGroup />
        <LunchGroups />
      </div>
    </section>
  );
};

export default DashboardPanel;
