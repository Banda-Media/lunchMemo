import LoaderSVG from '@styles/svg/loader.svg';

const Loading: React.FC = () => (
  <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col items-center">
        <LoaderSVG />
      </div>
    </div>
  </div>
);
export default Loading;
