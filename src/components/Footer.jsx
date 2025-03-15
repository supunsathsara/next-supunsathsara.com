import React from "react";
import Logo from "@public/images/white Logo-typography.png";
import Image from "next/image";
import Link from "next/link";
import StatusIndicator from "./StatusIndicator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container p-12 flex flex-col gap-3 md:gap-0 md:flex-row justify-between my-auto mx-auto">
        <Image
          src={Logo}
          alt="Supun Sathsara Logo"
          width={300}
          quality={100}
          className="my-auto mx-auto md:mx-0 w-1/2 sm:w-[300px]"
        />
        <div className="my-auto mx-auto md:mx-0 text-center">
          <p className="text-slate-400">
            All rights reserved &copy; 2023 - {currentYear}
          </p>
        </div>
        <div className="my-auto">
          {/**Legal */}
          <ul className="flex flex-col space-y-1 md:space-y-2">
            <li>
              <Link
                href="https://status.supunsathsara.com"
                className="flex items-center text-slate-400 hover:text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* <span className="relative flex h-3 w-3 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span> */}
                <StatusIndicator />
                Status
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-white"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-slate-400 hover:text-white">
                Terms and Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
