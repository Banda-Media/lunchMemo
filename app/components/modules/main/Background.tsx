import Image from 'next/image';

const Background: React.FC = () => {
  return (
    <div className="site-background">
      <Image
        src={`/images/backgrounds/${Math.floor(Math.random() * 6)}.jpg`}
        alt="lunchmemo background"
        className="object-center object-cover pointer-events-none"
        layout="fill"
      />
      <div className="bginfo">
        <a href="www.something.com" rel="noopener noreferrer" target="_blank">
          First Last
          <br />
          <span>Title of the photo</span>
        </a>
      </div>
    </div>
  );
};

export default Background;
