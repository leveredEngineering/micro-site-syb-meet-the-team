import type { CTA, Image as ImageType } from "@yext/types";
import { Image, Link } from "@yext/pages-components";
import c from "classnames";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { MaybeLink } from "src/components/common/MaybeLink";
import { SiteProfile, SubSection, Link as LinkType } from "src/types/entities";

type SimpleHeaderProps = {
  ctas: LinkType[];
  logo?: ImageType;
};
const SimpleHeader = ({ ctas, logo }: SimpleHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="Header relative bg-brand-primary text-white">
      <div className="container py-5 flex justify-start md:justify-between">
        {logo && (
          <MaybeLink className="Header-logoLink" href="levered.xyz">
            <div className="flex w-[144px] mr-2">
              <Image image={logo} layout="fill" />
            </div>
          </MaybeLink>
        )}

        <div className="hidden md:flex items-center">
          <ul className="flex">
            {ctas && ctas.map((item: LinkType) => (
              <li key={item.label}>
                <Link className="Link mx-2 lg:mx-5" href={item.uRL} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="flex md:hidden absolute p-4 right-0 top-1/2 -translate-y-1/2"
          onClick={() => setMenuOpen(!menuOpen)}

        >
          {menuOpen ? <FaTimes /> : <FaBars />}
          <span className="sr-only">Toggle Header Menu</span>
        </button>
      </div>

      <div
        className={
          c({ visible: menuOpen }) +
          "hidden absolute top-full left-0 right-0 h-screen bg-white"
        }
      >
        <div className="container">
          <ul className="flex flex-col">
            {ctas && ctas.map((item: LinkType) => (
              <li key={item.label}>
                <Link className="Link Link--header py-3 block" href={item.uRL} target="_blank" rel="noreferrer">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export { SimpleHeader };
