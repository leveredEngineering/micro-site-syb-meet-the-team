import { useState } from "react";
import c from "classnames";
import SubMenu from "./SubMenu";
import { SubSection } from "src/types/entities";

const HeaderSectionDesktop = ({ title, links } : SubSection) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  return (
    <li>
      <button 
        className={c({ "bg-header-hover": isHovered }) + " p-4 px-6 py-5 uppercase text-center text-xl font-normal tracking-wide Header-subTitle text-white"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
      </button>
      <SubMenu display={isHovered} links={links} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
    </li>
  )
};
export default HeaderSectionDesktop;