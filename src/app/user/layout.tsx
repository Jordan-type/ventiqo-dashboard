import UserHeader from '@/components/Layouts/user-navigation/user-header';
import UserSidebar from '@/components/Layouts/user-navigation/user-sidebar';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function UserDashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
  return (
    <div className="flex h-screen">
      <UserSidebar />
      <div className="flex flex-col flex-1 w-full">
        <UserHeader />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};