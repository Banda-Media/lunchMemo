import MakerLink from './MakerLink';

const Newsletter: React.FC = () => {
  return (
    <div className="sm:w-1/4 h-auto sm:mt-0 mt-8">
      <div className="text-green-dark mb-2">My Makers</div>
      <ul className="list-reset leading-normal space-y-5">
        {[
          ['https://github.com/andresmweber.png?size=24', 'Andres Weber'],
          ['https://github.com/bobbypwang.png?size=24', 'Bobby Wang']
        ].map(([url, name]) => (
          <MakerLink url={url} name={name} />
        ))}
      </ul>
    </div>
  );
};
export default Newsletter;
