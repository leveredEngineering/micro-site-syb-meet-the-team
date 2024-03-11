import * as React from "react";
import Svg from "src/common/utilities/Svg";
import { Link, SiteProfile, SubSection } from "src/types/entities";

import {
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaFacebookSquare,
} from "react-icons/fa";
export interface FooterProps {
  _site: SiteProfile;
  logo?: string;
  paragraph?: string;
}

const Footer = (props: FooterProps) => {
  const { paragraph, _site } = props;
  const navigation = {
    social: [
      {
        name: "Facebook",
        href: _site.c_facebookURL,
        icon: (
          props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
        ) => <FaFacebookSquare className="w-7 h-7 mr-4" style={{ fill: 'white' }}/>,
      },
      {
        name: "Instagram",
        href: _site.c_instagramURL,
        icon: (
          props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
        ) => <FaInstagram className="w-7 h-7 mr-4" style={{ fill: 'white' }} />,
      },
      {
        name: "LinkedIn",
        href: _site.c_linkedInURL,
        icon: (
          props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
        ) => <FaLinkedin className="w-7 h-7 mr-4" style={{ fill: 'white' }} />,
      },
      {
        name: "Twitter",
        href: _site.c_twitterURL,
        icon: (
          props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
        ) => <FaTwitter className="w-7 h-7 mr-4" style={{ fill: 'white' }} />,
      },
    ],
  };
  const { c_header, c_bottomFooter } = props._site;
  return (
    <>
      <footer className="Footer bg-brand-primary text-white flex flex-col items-center" aria-labelledby="footer-heading">
        <div className="Footer-container flex flex-col">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="Footer-top hidden lg:flex py-20 px-8 lg:px-4">
            <div className="Footer-topDesktop flex flex-row w-full">
              {c_header?.subSections.map((section :SubSection) => (
                <div className="Footer-linkSection flex flex-col flex-1 flex-shrink-1 flex-basis-0">
                  <h3 className="Footer-topHeading mb-6 uppercase font-normal text-lg tracking-wide">
                    {section.title}
                  </h3>
                  <ul className="Footer-topList">
                    {section.links.map((link :Link) => (
                      <li><a href={link.uRL} className="font-catamaran hover:underline">{link.label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="Footer-bottom flex w-full py-12 px-8 lg:px-4 flex-col lg:flex-row items-center lg:items-start">
              <div className="Footer-logos flex lg:mr-8 mb-4 lg:mb-0">
                <Svg name="ehllogo" customCss="fill-white" />
                <Svg name="fdiclogo" customCss="fill-white" />
              </div>
              <div className="Footer-rowLinks flex lg:mr-8 mb-4 lg:mb-0">
                <div className="Footer-middleLinks">
                </div>
                <div className="Footer-copyright font-medium">
                  <ul className="Footer-bottomLinksDesktop hidden lg:flex flex-wrap mb-2 mr-16">
                  {c_bottomFooter?.links && c_bottomFooter.links.map((link: Link, index: number) => (
                    <React.Fragment key={link.label}>
                      <li className="inline-block Footer-bottomLinkMobile">
                        <a href={link.uRL} className="hover:underline">{link.label}</a>
                        {index !== c_bottomFooter.links.length - 1 && (
                          <span className="mx-2">|</span> // Change this to your desired separator
                        )}
                      </li>
                    </React.Fragment>
                  ))}
                  </ul>
                  <ul className="Footer-bottomLinksMobile flex flex-col items-center justify-center lg:hidden">
                    {c_bottomFooter?.links && c_bottomFooter.links.map((link: Link) => (
                      <li className="inline-block Footer-bottomLinkMobile" key={link.label}>
                        <a href={link.uRL}>{link.label}</a>
                      </li>
                    ))}
                  </ul>
                  <div className="Footer-copyrightContainer lg:m-0 text-normal leading-5 text-white text-center lg:text-left flex flex-col">
                    <span className="mb-2">© {getCurrentYear()} Stock Yards Bank & Trust. All rights reserved.</span>
                    <span>Routing Number: #083000564</span>
                  </div>
                </div>
              </div>
              <div className="Footer-socialLinks flex">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6 fill-white" aria-hidden="true" />
                  </a>
                ))}
              </div>
          </div>
        </div>
      </footer>
    </>
  );
};

function getCurrentYear() {
  const currentTime = new Date();
  return currentTime.getFullYear();
}

export default Footer;
