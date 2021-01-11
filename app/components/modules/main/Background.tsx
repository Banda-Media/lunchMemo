const Background: React.FC = () => {
  const randomBG = `bg-site-${Math.floor(Math.random() * 6)}`;
  return (
    <div className={`site-background ${randomBG}`}>
      <div className="bginfo">
        <a href="www.something.com" target="_blank">
          First Last
          <br />
          <span>Title of the photo</span>
        </a>
      </div>
    </div>
  );
};

export default Background;
