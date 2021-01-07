interface TitleProps {
  label: string;
}
const Title: React.FC<TitleProps> = ({ label }) => {
  return <h3 className="my-4 text-2xl font-semibold text-gray-700">{label}</h3>;
};
export default Title;
