import Layout from '@components/layouts/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import LunchGroup from '@components/modules/dashboard/components/LunchGroup';
import LunchGroupProvider, { useLunchGroup } from '@hooks/LunchGroupContext';
import { LunchGroup as LunchGroupType } from '@typing/types';

const GroupPage: React.FC = () => {
  const router = useRouter();
  const { getGroup } = useLunchGroup();
  const { groupId } = router.query;
  const [group, setGroup] = useState<LunchGroupType>();

  useEffect(() => {
    const loadGroup = async () => {
      const group = await getGroup(groupId as string);
      setGroup(group);
    };
    loadGroup();
  }, []);

  return (
    <LunchGroupProvider>
      <Layout>{group && <LunchGroup group={group} hasDetailButton={false} />}</Layout>
    </LunchGroupProvider>
  );
};
export default GroupPage;
