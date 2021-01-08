import { MakerLinkProps } from '@typing/props';

const MakerLink: React.FC<MakerLinkProps> = ({ url, name }) => (
  <li className="hover:text-green-dark text-grey-darker">
    <div className="flex whitespace-no-wrap text-sm leading-5 text-black-500">
      <img src={url} className="align-middle" alt={`${name} Avatar`} height="24px" width="24px" />
      <span className="px-2 text-xs">{name}</span>
    </div>
  </li>
);

export default MakerLink;
