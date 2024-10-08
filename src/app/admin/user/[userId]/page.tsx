// import { Breadcrumbs } from '@/components/breadcrumbs';
// import { ProductForm } from '@/components/Forms/product-form';
import PageContainer from '@/components/Layouts/page-container';
import { ScrollArea } from '@/components/ui/scroll-area';
import React from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'User', link: '/dashboard/user' },
  { title: 'Create', link: '/dashboard/user/create' }
];
export default function Page() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-4">
        {/* <ProductForm
          categories={[
            { _id: 'shirts', name: 'shirts' },
            { _id: 'pants', name: 'pants' }
          ]}
          initialData={null}
          key={null}
        /> */}
      </div>
    </PageContainer>
  );
}
