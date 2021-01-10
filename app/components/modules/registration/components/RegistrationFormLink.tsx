import Link from 'next/link';
import { RegistrationFormLinkProps } from '@typing/props';

const RegistrationFormLink: React.FC<RegistrationFormLinkProps> = ({ prompt, linkText, url }) => (
  <p className="mt-2 text-center text-md text-gray-600">
    {prompt}
    <Link href={url}>
      <span className="ml-2 text-blue-500 cursor-pointer">{linkText}</span>
    </Link>
  </p>
);

export default RegistrationFormLink;
