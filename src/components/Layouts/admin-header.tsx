import ThemeToggle from '@/components/Layouts/ThemeToggle/theme-toggle';
import DropdownNotification from "@/components/Layouts/dropdown-notifications"
import { MobileSidebar } from './mobile-sidebar';
import { AdminNav } from './admin-nav';
import { cn } from '@/lib/utils';


export default function AdminHeader() {
    return (
      <header className="sticky inset-x-0 top-0 w-full">
        <nav className="flex items-center justify-between px-4 py-2 md:justify-end">
          <div className={cn('block lg:!hidden')}>
            <MobileSidebar />
          </div>
          <div className="flex items-center gap-2"> 
            <DropdownNotification />   
            <AdminNav />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    );
  }

