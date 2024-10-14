"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, Squares2X2Icon, XMarkIcon } from "@heroicons/react/24/solid"; // Bars3Icon

interface NavItemProps {
  children: React.ReactNode;
  href?: string;
}

function NavItem({ children, href }: NavItemProps) {
  return (
    <li>
      <a
        href={href || "#"}
        target={href ? "_blank" : "_self"}
        className="flex items-center gap-2 font-medium"
      >
        {children}
      </a>
    </li>
  );
}

const NAV_MENU = [
  {
    name: "Explore Events",
    // icon: RectangleStackIcon,
    href: "/events"
  },
  {
    name: "About Us",
    // icon: Squares2X2Icon,
    href: "",
  },
  {
    name: "Pricing",
    // icon: UserCircleIcon,
    href: "/pricing",
  },

  {
    name: "Docs",
    // icon: CommandLineIcon,
    href: "",
  },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [isScrolling, setIsScrolling] = React.useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full border-0 transition-colors duration-300 ${
        isScrolling ? "bg-[#75C9E3]/80 text-white" : "bg-[#75C9E3] text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Image
            src={"/images/logo/ventiqo-white-logo.svg"}
            alt="Ventiqo Logo"
            width={40}
            height={40}
          />
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-white" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name,  href }) => ( // icon: Icon,
            <NavItem key={name} href={href}>
              {/* <Icon className="h-5 w-5" /> */}
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <Link  href="/auth/signin">
            SignIn
          </Link>
          <Link href="/auth/signup" target="_blank">
            Get Started
          </Link>
        </div>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" onClick={handleOpen} className="lg:hidden">
              {open ? (
                // <XMarkIcon strokeWidth={2} className="h-6 w-6" />
              ) : (
                // <Bars3Icon strokeWidth={2} className="h-6 w-6" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start" className="w-[200px] mt-2">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <DropdownMenuItem key={name}>
                <Icon className="h-5 w-5 mr-2" />
                {name}
              </DropdownMenuItem>
            ))}
            <div className="mt-4">
              <Link  href="/auth/signin" className="w-full mb-2">
                Log in
              </Link>
              <Link  href="/auth/signup" target="_blank" className="w-full">
                Get Started
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
    </nav>
  );
}

export default Navbar;
