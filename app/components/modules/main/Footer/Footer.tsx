import Newsletter from './Newsletter';
import Makers from './Makers';

const Footer: React.FC = () => {
  return (
    <div className="container-fluid bg-white text-sm px-12 py-6">
      <div className="sm:flex justify-between">
        <Makers />
        <Newsletter />
      </div>
    </div>
  );
};

export default Footer;
