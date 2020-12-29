import { Props } from '../pages/_app';

const Modal: React.FC<Props> = ({ Component, pageProps }) => {
  return (
    <div className="min-h-screen bg-gray-300 py-6 flex flex-col justify-center sm:py-12">
      <div className="py-3 sm:max-w-xl sm:mx-auto">
        <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default Modal;
