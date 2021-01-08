import { ListItemLinkProps } from '@typing/props';
import ListItem from './ListItem';

const ListItemLink: React.FC<ListItemLinkProps> = ({ url, label }) => {
  return (
    <ListItem>
      <a
        className="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4"
        href={url}>
        {label}
      </a>
    </ListItem>
  );
};
export default ListItemLink;
