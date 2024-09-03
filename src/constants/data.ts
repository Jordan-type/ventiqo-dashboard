import { NavItem, UserNavItem } from '@/types/nav-item';
import { signOut } from "next-auth/react"; 

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};

export const users: User[] = [
  {
    id: 1,
    name: 'Candice Schiner',
    company: 'Dell',
    role: 'Frontend Developer',
    verified: false,
    status: 'Active'
  },
  {
    id: 2,
    name: 'John Doe',
    company: 'TechCorp',
    role: 'Backend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 3,
    name: 'Alice Johnson',
    company: 'WebTech',
    role: 'UI Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 4,
    name: 'David Smith',
    company: 'Innovate Inc.',
    role: 'Fullstack Developer',
    verified: false,
    status: 'Inactive'
  },
  {
    id: 5,
    name: 'Emma Wilson',
    company: 'TechGuru',
    role: 'Product Manager',
    verified: true,
    status: 'Active'
  },
  {
    id: 6,
    name: 'James Brown',
    company: 'CodeGenius',
    role: 'QA Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 7,
    name: 'Laura White',
    company: 'SoftWorks',
    role: 'UX Designer',
    verified: true,
    status: 'Active'
  },
  {
    id: 8,
    name: 'Michael Lee',
    company: 'DevCraft',
    role: 'DevOps Engineer',
    verified: false,
    status: 'Active'
  },
  {
    id: 9,
    name: 'Olivia Green',
    company: 'WebSolutions',
    role: 'Frontend Developer',
    verified: true,
    status: 'Active'
  },
  {
    id: 10,
    name: 'Robert Taylor',
    company: 'DataTech',
    role: 'Data Analyst',
    verified: false,
    status: 'Active'
  }
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'dashboard',
    label: 'Dashboard'
  },
  {
    title: 'Events',
    href: '/admin/events', // 
    icon: 'ticket',
    label: 'employee'
  },
  {
    title: 'Orders',
    href: '/admin/order',
    icon: 'shoppingCart',
    label: 'orders'
  },
  {
    title: 'Users',
    href: '/admin/user',
    icon: 'usersRound',
    label: 'user'
  },
  {
    title: 'Employee',
    href: '/admin/employee',
    icon: 'users2',
    label: 'employee'
  },
  {
    title: 'Setting',
    href: '/admin/settings',
    icon: 'settings',
    label: 'settings'
  },
  {
    title: 'Sign Out',
    href: '/',
    icon: 'lock',
    label: 'signout',
    onClick: () => signOut({ callbackUrl: "/" }), // Add signOut function here
  }
];


export const userNavItems: UserNavItem[] = [
  {
    title: 'Dashboard',
    href: '/user',
    icon: 'layoutDashboard', // Matches TablerIcons key
    label: 'Dashboard'
  },
  {
    title: 'Search Events',
    href: '/user/events',
    icon: 'users', // Updated to match a valid TablerIcons key
    label: 'events'
  },
  {
    title: 'Inbox',
    href: '/user/inbox',
    icon: 'messages', // Updated to match a valid TablerIcons key
    label: 'inbox'
  },
  {
    title: 'Invites',
    href: '/user/invites',
    icon: 'invites', // Updated to match a valid TablerIcons key
    label: 'invites'
  },
  {
    title: 'My Calendar',
    href: '/user/my/calendar',
    icon: 'calendar', // Updated to match a valid TablerIcons key
    label: 'calendar'
  },
  {
    title: 'Settings',
    href: '/user/settings',
    icon: 'settings', // Valid icon name in TablerIcons
    label: 'settings'
  },
  {
    title: 'Sign Out',
    href: '#', // Use '#' because we will handle logout via onClick
    icon: 'lock', // Updated to match a valid TablerIcons key for a lock or sign-out symbol
    label: 'signout',
    onClick: () => signOut({ callbackUrl: "/" }), // Add signOut function here
  }
];

