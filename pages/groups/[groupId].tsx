import Layout from '@components/layouts/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '@common/Loading';
import LunchGroup from '@components/modules/dashboard/components/LunchGroup';
import LunchGroupProvider, { useLunchGroup } from '@hooks/LunchGroupContext';
import { ILunchGroup } from '@typing/types';

const GroupPage: React.FC = () => {
  const router = useRouter();
  const { getGroup } = useLunchGroup();
  const { groupId } = router.query;
  const [group, setGroup] = useState<ILunchGroup>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGroup = async () => {
      setLoading(true);
      const group = await getGroup(groupId as string);
      setGroup(group);
      setLoading(false);
    };
    loadGroup();
  }, [groupId]);

  return (
    <LunchGroupProvider>
      <Layout>
        {loading ? <Loading /> : group && <LunchGroup group={group} hasDetailButton={false} />}
      </Layout>
    </LunchGroupProvider>
  );
};
export default GroupPage;
