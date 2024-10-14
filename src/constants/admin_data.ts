
import { signOut } from "next-auth/react"; 
import { Group, Menu  } from "./data";
import { LayoutGrid, Users, ShoppingCart, Settings, Lock, Ticket } from "lucide-react";

export function getAdminMenu(pathname: string): Group[] {
  return [
    {
      groupLabel: "Main",
      menus: [
        {
          href: "/admin",
          label: "Dashboard",
          active: pathname.includes("/admin"),
          icon: LayoutGrid,
          submenus: [] // No dropdown for this one
        },
        {
          href: "/admin/events",
          label: "Events",
          active: pathname.includes("/admin/events"),
          icon: Ticket,
          submenus: [
            { href: "/admin/events/all", label: "All Events", active: pathname === "/admin/events/all" },
            { href: "/admin/events/new", label: "New Event", active: pathname === "/admin/events/new" }
          ]
        },
        {
          href: "/admin/orders",
          label: "Orders",
          active: pathname.includes("/admin/orders"),
          icon: ShoppingCart,
          submenus: []
        },
        {
          href: "/admin/users",
          label: "Users",
          active: pathname.includes("/admin/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/admin/settings",
          label: "Settings",
          active: pathname.includes("/admin/settings"),
          icon: Settings,
          submenus: []
        },
        {
          href: "#",
          label: "Sign Out",
          active: false,
          icon: Lock,
          submenus: [],
          onClick: () => signOut({ callbackUrl: "/" }), // Add signOut function here // Custom action
        }
      ]
    }
  ];
}
