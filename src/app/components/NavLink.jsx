import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className="block py-2 md:py-3  md:px-5 text-[#ADB7BE] sm:text-xl hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
