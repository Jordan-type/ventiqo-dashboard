import { BreadcrumbWrapper } from '@/components/ui/breadcrumb';
import PageContainer from '@/components/Layouts/page-container';
import UserClient  from '@/components/Tables/users-tables/client';

export default function page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
      <BreadcrumbWrapper pageName="User" />
        <UserClient />
      </div>
    </PageContainer>
  );
}
