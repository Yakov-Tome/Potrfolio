"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDiscussFill, RiHome9Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { TbBriefcase2Filled } from "react-icons/tb";
import { IoMailOpen } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();

  const routes = [
    { href: "/", icon: <RiHome9Fill size="24" />, name: "Home" },
    { href: "/pages/about", icon: <FaUserAlt size="24" />, name: "About" },
    {
      href: "/pages/portfolio",
      icon: <TbBriefcase2Filled size="24" />,
      name: "Portfolio",
    },
    { href: "/pages/contact", icon: <IoMailOpen size="24" />, name: "Contact" },
    { href: "/pages/blog", icon: <RiDiscussFill size="24" />, name: "Blog" },
  ];

  return (
    <>
      {/* Mobile Bottom Navbar */}
      <nav
        className="dock bg-black/94 text-neutral-content lg:hidden max-h-[60px]"
        aria-label="Mobile navigation"
      >
        {routes.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            title={link.name}
            className={
              pathname === link.href
                ? "bg-[#F0B100]"
                : "hover:scale-130 transition duration-300"
            }
          >
            {link.icon}
          </Link>
        ))}
      </nav>

      {/* Desktop Right Sidebar */}
      <nav
        className="fixed top-[30%] right-0 z-50 p-4 hidden lg:block"
        aria-label="Desktop navigation"
      >
        <ul className="menu bg-white/10 shadow-lg rounded-box">
          <li className="flex gap-4">
            {routes.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                title={link.name}
                data-tip={link.name}
                className={
                  pathname === link.href
                    ? "bg-[#F0B100] tooltip tooltip-left"
                    : "tooltip tooltip-left tooltip-info"
                }
              >
                {link.icon}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
