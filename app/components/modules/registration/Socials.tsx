import { ISocialAction } from '@typing/types';
import GoogleSVG from '@styles/svg/google.svg';
import GithubSVG from '@styles/svg/github.svg';
import { ReactElement } from 'react';

const Socials: React.FC<ISocialAction> = ({ message, clickHandler }) => {
  const elements: Array<[string, ReactElement]> = [
    ['Github', <GithubSVG />],
    ['Google', <GoogleSVG />]
  ];
  return (
    <div className="flex flex-col space-y-5 py-5">
      <span className="flex items-center justify-center space-x-2">
        <span className="h-px bg-gray-400 w-14"></span>
        <span className="font-normal text-gray-500 whitespace-nowrap">{message}</span>
        <span className="h-px bg-gray-400 w-14"></span>
      </span>
      <div className="flex flex-col space-y-4">
        {elements.map(([title, svg]) => (
          <button
            id={`${title.toLowerCase()}-signup`}
            onClick={clickHandler}
            className="flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none">
            <span>{svg}</span>
            <span className="text-sm font-medium text-gray-800 group-hover:text-white">
              {title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Socials;
