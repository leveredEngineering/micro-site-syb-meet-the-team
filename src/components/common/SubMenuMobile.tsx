import React from 'react';
import c from "classnames";
import { Link } from 'src/types/entities';
import { dynamic } from '@yext/pages/util';

const Collapse = dynamic(
  () => import("@material-tailwind/react/components/Collapse")
);

type SubMenuProps = {
  links: Link[];
  display: boolean;
};

const SubMenuMobile = ({links, display} : SubMenuProps) => {
  return (
    <ul className={
      c({ visible: display }) +
      "hidden Header-subMenuMobile flex flex-col text-white"
    }>
      <Collapse open={display}>
        {links.map((link, index) => (
          <li key={index} className="outline-black bg-brand-tertiary p-4">
            <a href={link.uRL} className="text-white font-catamaran hover:underline">
              {link.label}
            </a>
          </li>
        ))}
      </Collapse>
    </ul>
  );
};

export default SubMenuMobile;