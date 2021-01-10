import { FC, MutableRefObject, useRef } from 'react';
import Logo from '@components/common/Logo';
import MenuButtonMobile from './MenuButtonMobile';
import ActionsList from './ActionsList/ActionsList';

const Header: FC = () => {
  const navContent = useRef() as MutableRefObject<HTMLDivElement>;
  return (
    <nav className="text-white bg-white flex items-center justify-between flex-wrap px-10 py-3 w-full z-10 top-0">
      <Logo />
      <MenuButtonMobile click={() => navContent.current.classList.toggle('hidden')} />
      <ActionsList navContent={navContent} />
    </nav>
  );
};

export default Header;
