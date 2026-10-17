import React from "react";
import NavLink from "./NavLink";

interface MenuOverlayProps {
  links: { path: string; title: string }[];
  onClose: () => void;
  id?: string;
}

const MenuOverlay = ({
  links,
  onClose,
  id,
}: MenuOverlayProps) => {
  return (
    <ul id={id} className="flex flex-col py-4 items-center">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink href={link.path} title={link.title} onClick={onClose} />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
