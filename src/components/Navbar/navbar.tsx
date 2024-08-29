import React from "react";
import { RectangleStackIcon, UserCircleIcon, CommandLineIcon, Squares2X2Icon, XMarkIcon, Bars3Icon } from "@heroicons/react/24/solid";

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
    name: "Events",
    icon: RectangleStackIcon,
  },
  {
    name: "Features",
    icon: UserCircleIcon,
  },
  {
    name: "About",
    icon: Squares2X2Icon,
    href: "",
  },
  {
    name: "Docs",
    icon: CommandLineIcon,
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
        isScrolling ? "bg-white text-gray-900" : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="text-lg font-bold">
          Ventiqo
        </div>
        <ul
          className={`ml-10 hidden items-center gap-6 lg:flex ${
            isScrolling ? "text-gray-900" : "text-white"
          }`}
        >
          {NAV_MENU.map(({ name, icon: Icon, href }) => (
            <NavItem key={name} href={href}>
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          <a href="/auth/signin">
            <button className={`py-2 px-4 rounded-md ${isScrolling ? "bg-gray-300 text-gray-900" : "bg-transparent text-white"}`}>
              Log in
            </button>
          </a>
          <a href="/auth/signup" target="_blank">
            <button className={`py-2 px-4 rounded-md ${isScrolling ? "bg-blue-600 text-white" : "bg-white text-black"}`}>
              Get Started
            </button>
          </a>
        </div>
        <button
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </button>
      </div>
      {open && (
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, href }) => (
              <NavItem key={name} href={href}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            <a href="/auth/signin">
              <button className="py-2 px-4 rounded-md bg-gray-300 text-gray-900">
                Log in
              </button>
            </a>
            <a href="/auth/signup" target="_blank">
              <button className="py-2 px-4 rounded-md bg-blue-600 text-white">
                Get Started
              </button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
