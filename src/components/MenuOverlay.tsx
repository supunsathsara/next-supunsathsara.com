import React from "react";
import PropTypes from "prop-types";
import NavLink from "./NavLink";

interface MenuOverlayProps {
  links: { path: string; title: string }[];
  onClose: () => void;
}

const MenuOverlay = ({ links, onClose }: MenuOverlayProps) => {
  return (
    <ul className="flex flex-col py-4 items-center">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink href={link.path} title={link.title} onClick={onClose} />
        </li>
      ))}
    </ul>
  );
};

MenuOverlay.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MenuOverlay;
