import Link from "next/link";

const NavLink = ({ href, title, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 md:py-3  md:px-5 text-[#ADB7BE] sm:text-xl hover:text-white"
    >
      {title}
    </Link>
  );
};

export default NavLink;
