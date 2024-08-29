import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  onClick?: () => void;
}

export interface UserNavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  onClick?: () => void;
}
