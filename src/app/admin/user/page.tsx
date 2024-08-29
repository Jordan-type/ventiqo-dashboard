import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import PageContainer from '@/components/Layouts/page-container';
import { UserClient } from '@/components/Tables/user-tables/client';
import { users } from '@/constants/data';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
      <Breadcrumb pageName="User" />
        <UserClient data={users} />
      </div>
    </PageContainer>
  );
}
