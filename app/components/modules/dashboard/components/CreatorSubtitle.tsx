const CreatorSubtitle: React.FC<{ owner: string; foods: string[] }> = ({ owner, foods }) => {
  return (
    <div className="flex py-2 text-xsm text-gray-200">
      <sub>Creator: {owner}</sub>
      <sub>{Object.keys(foods).join(' ')}</sub>
    </div>
  );
};
export default CreatorSubtitle;
