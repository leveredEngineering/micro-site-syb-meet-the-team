import { Link, Image } from "@yext/pages-components";
import logo_white from '../../assets/images/logo_white.svg';
import { Promo as PromoProps} from "src/types/entities";

import { LexicalRichText } from "@yext/pages-components";
import { LazyLoadWrapper } from "../common/LazyLoadWrapper";

const PromoWhite = ({description, title, link, image}: PromoProps) => {
  return (
    <section className="Promo py-8 bg-brand-gray-700">
      <div className="container flex flex-col md:flex-row">
        {image && (
          <div className="Promo-mobileImg flex md:hidden">
            <LazyLoadWrapper>
              <Image image={image} />
            </LazyLoadWrapper>
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col gap-8 mt-8 md:mr-16 text-brand-primary">
          <h2 className="Heading Heading--head  font-medium font-lato">{title}</h2>
          {description && (
            <div className="text-base font-light font-lato">
              <LexicalRichText serializedAST={JSON.stringify(description.json)} />
            </div>
          )}
          {link && (
            <div className="flex mb-4">
              <Link className="Button--green" href={link.uRL} target="_blank" rel="noreferrer">
                {link.label}
              </Link>
            </div>
          )}
        </div>
        {image ? (
          <div className="w-full md:w-1/2 flex items-center justify-center hidden md:flex">
            <LazyLoadWrapper>
              <Image image={image} />
            </LazyLoadWrapper>
          </div>
        ) : (
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {/* Fallback Image for Development */}
            <img src={logo_white} className="h-8 Header-logo" itemProp="logo" />
          </div>
        )}
      </div>
    </section>
  );
};

export default PromoWhite;
