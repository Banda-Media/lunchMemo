import Link from 'next/link';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center flex-shrink-0 mr-6">
      <Link href="/">
        <h1 className="lm-logo cursor-pointer">
          <span className="lm-lunch">LUNCH</span>
          <span className="lm-memo">memo</span>
        </h1>
      </Link>
    </div>
  );
};
export default Logo;
