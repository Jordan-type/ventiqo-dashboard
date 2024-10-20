import AdminHeader from '@/components/Layouts/admin-navigation/admin-header';
import AdminSidebar from '@/components/Layouts/admin-navigation/admin-sidebar';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ventiqo Admin Dashboard',
  description: 'Admin dashboard for Ventiqo: Manage events, users, payments, analytics, and platform settings. Get insights into event performance, sales, and attendee engagement with a user-friendly interface.'
};

export default function DashboardLayout({
    children
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex">
        <AdminSidebar />
        <main className="w-full flex-1 overflow-hidden">
          <AdminHeader />
          {children}
        </main>
      </div>
    );
  }
