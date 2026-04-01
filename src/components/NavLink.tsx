import Link from "next/link";

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
}

const NavLink = ({ href, title, onClick }: NavLinkProps) => {
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
