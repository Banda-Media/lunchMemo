import { useRouter } from 'next/router';

const LunchGroupButton: React.FC<{ name: string }> = ({ name }) => {
  const router = useRouter();
  return (
    <div className="w-10 shadow bg-white">
      <button
        className="fas fa-chevron-right h-full w-full p-1 text-gray-200"
        onClick={() => router.push(`/groups/${name}`)}></button>
    </div>
  );
};
export default LunchGroupButton;
