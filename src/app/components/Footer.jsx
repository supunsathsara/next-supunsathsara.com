import React from "react";
import Logo from "../../../public/images/white Logo-typography.png";
import Image from "next/image";

const Footer = () => {
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
        <div className="my-auto mx-auto md:mx-0">
        <p className="text-slate-600">All rights reserved &copy; 2023</p>
        </div>
        <div className="my-auto">
          {/**Legal */}
          <ul className="flex flex-col space-y-1 md:space-y-2">
            <li>
              <a
                href="https://www.supunsathsara.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-white"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.supunsathsara.com/terms-and-conditions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-white"
              >
                Terms and Conditions
              </a>
            </li>
          </ul>  
        </div>
      </div>
    </footer>
  );
};

export default Footer;
