import React from 'react';
import c from "classnames";
import { Link } from 'src/types/entities';

type SubMenuProps = {
  links: Link[];
  display: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const SubMenu = ({ links, display, onMouseEnter, onMouseLeave} :SubMenuProps) => {
  return (
    <ul className={
      c({ visible: display }) +
      "hidden absolute Header-subMenu z-50"
    }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {links.map((link, index) => (
        <li className="bg-brand-gray-300 p-2 hover:bg-brand-gray-400">
          <a href={link.uRL} className="block w-full text-white px-2">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SubMenu;