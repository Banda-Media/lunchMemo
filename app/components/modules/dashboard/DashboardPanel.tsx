import LunchGroupProvider from '@hooks/LunchGroupContext';
import CreateGroup from './components/CreateGroup';
import LunchGroups from './components/LunchGroups';

const DashboardPanel: React.FC = () => {
  return (
    <LunchGroupProvider>
      <section className="mx-auto w-full animated fadeInDown faster">
        <div className="flex flex-col mx-auto items-center space-y-5 p-10">
          <h2 className="w-full large-title text-center">start a lunch group</h2>
          <CreateGroup />
          <LunchGroups />
        </div>
      </section>
    </LunchGroupProvider>
  );
};

export default DashboardPanel;
