import AdminHeader from '@/components/Layouts/admin-header';
import Sidebar from '@/components/Layouts/sidebar';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
        <Sidebar />
        <main className="w-full flex-1 overflow-hidden">
          <AdminHeader />
          {children}
        </main>
      </div>
    );
  }
