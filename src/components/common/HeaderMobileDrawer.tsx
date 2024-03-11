import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SubSection } from 'src/types/entities';
import CustomSearchBar from './HeaderComponents/CustomSearchBar';
import HeaderSectionMobile from './HeaderSectionMobile';
import c from "classnames";

type HeaderMobileDrawerProps = {
  menuOpen: boolean;
  toggleMenu: () => void;
  c_header: {
    subSections: SubSection[];
  };
  wrapperRef: any;
};

const HeaderMobileDrawer = ({menuOpen, toggleMenu, c_header, wrapperRef}: HeaderMobileDrawerProps) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event :any) {
      if (menuOpen && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        toggleMenu();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, menuOpen]);
  
  const handleSectionToggle = (sectionId: string) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };
  return (
    <div className={c({visible: menuOpen}) + "hidden Header-mobileDrawer thickBorder fixed top-0 left-0 w-64 h-full bg-brand-primary transform transition-transform container p-0 overflow-y-scroll"}>
      <div className="Header-mobileTop uppercase flex p-4 text-white flex justify-between">
        <span className="text-white Header-mobileTitle">Main Menu</span>
        <button className="text-white" onClick={() => toggleMenu()}>
          <span className="sr-only">Close Menu</span>
          <FaTimes />
        </button>
      </div>
      <CustomSearchBar  customFormCssClasses="flex"
                        customInputCssClasses="w-full p-2 pl-4"
                        customButtonClasses="p-2 bg-brand-green"
                        ariaLabel="mobile_search"
                        formId='header-mobile-search-form'
      />
      <ul className="flex flex-col text-white Header-mobileSections">
        {c_header?.subSections && c_header.subSections.map((section: SubSection) => {
          const sectionId = "header-mobile-drawer-section-" + section.title.replace(/\s/g, "-").toLowerCase();
          const isOpenSection = openSection === sectionId;

          return (
            <HeaderSectionMobile 
              id={sectionId}
              subSection={section} 
              onToggle={(sectionId) => handleSectionToggle(sectionId)} 
              isOpenSection={isOpenSection}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default HeaderMobileDrawer;