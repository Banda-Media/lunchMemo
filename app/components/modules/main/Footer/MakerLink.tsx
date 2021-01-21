import { MakerLinkProps } from '@typing/props';
import Image from 'next/image';

const MakerLink: React.FC<MakerLinkProps> = ({ url, name }) => (
  <li className="hover:text-green-dark text-grey-darker">
    <a
      className="flex whitespace-no-wrap text-sm leading-5 text-black-500"
      target="_blank"
      rel="noopener noreferrer"
      href={url}>
      <Image
        src={`${url}${'.png?size=32'}`}
        className="align-middle"
        width={32}
        height={32}
        alt={`${name} Avatar`}
      />
      <span className="p-2 text-xs">{name}</span>
    </a>
  </li>
);

export default MakerLink;
