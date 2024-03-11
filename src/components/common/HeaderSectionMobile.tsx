import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import SubMenuMobile from "./SubMenuMobile";
import { SubSection } from "src/types/entities";

type HeaderSectionMobileProps = {
  subSection: SubSection;
  isOpenSection: boolean;
  onToggle: (key: string) => void;
  id: string;
};
const HeaderSectionMobile = ({subSection, id, isOpenSection, onToggle} : HeaderSectionMobileProps) => {
  const toggleSection = () => {
    onToggle(id);
  };

    return (
      <li className="text-white" id={id}>
        <button onClick={toggleSection} className="Link Link--header py-3 flex w-full items-center justify-between p-4 uppercase">
          <span className="font-catamaran hover:underline">{subSection.title}</span>
          {isOpenSection ? <FaAngleUp /> : <FaAngleDown />}
        </button>
        <SubMenuMobile links={subSection.links} display={isOpenSection} />
      </li>
    )
}

export default HeaderSectionMobile;