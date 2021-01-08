import { ListButtonLinkProps } from '@typing/props';
import ListItem from './ListItem';

const ListItemButton: React.FC<ListButtonLinkProps> = ({ click, label }) => {
  return (
    <ListItem>
      <button
        onClick={click}
        className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4">
        {label}
      </button>
    </ListItem>
  );
};

export default ListItemButton;
