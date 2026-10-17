"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import TypoLogo from "@public/images/Main-Logo.png"
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "/#about",
  },
  {
    title: "Projects",
    path: "/#projects",
  },
  {
    title: "Contact",
    path: "/#contact",
  },
  {
    title: "Blog",
    path: "https://blog.supunsathsara.com",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const closeNavbar = () => setNavbarOpen(false);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!navbarOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNavbarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navbarOpen]);

  return (
    <nav className="fixed mx-auto border border-[#33353F] top-0 left-0 right-0 z-20 bg-opacity-100 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md">
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href={"/"}
          className="text-2xl md:text-3xl text-white font-semibold"
        >
          <Image src={TypoLogo} alt="Supun Sathsara Logo" width={80} quality={100} priority className="mx-2 overflow-clip" style={{ height: "auto" }} />
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            onClick={() => setNavbarOpen((open) => !open)}
            aria-expanded={navbarOpen}
            aria-controls="mobile-menu"
            aria-label={navbarOpen ? "Close menu" : "Open menu"}
            className="flex items-center px-3 py-2 border rounded-sm border-slate-200 text-slate-200 hover:text-white hover:border-white"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        <div className="menu hidden md:block md:w-auto md:border md:border-[#7042f861] md:bg-[#0300145e] rounded-sm md:rounded-full" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink href={link.path} title={link.title} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <MenuOverlay id="mobile-menu" links={navLinks} onClose={closeNavbar} />
      ) : null}
    </nav>
  );
};

export default Navbar;
