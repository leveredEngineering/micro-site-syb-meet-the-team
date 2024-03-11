import { ReactNode, useState } from "react";
import { HoursStatus, HoursTable } from "@yext/sites-react-components";
import type { LocationProfile } from "src/types/entities";
import { FaMinus, FaPhone, FaPlus } from "react-icons/fa";
import { useBreakpoint } from "src/common/useBreakpoints";
import { formatPhoneNumber } from "react-phone-number-input";
import AddressLevered from "../leverageui/AddressLevered";
import { isLocation } from "src/common/utilities/entityType";

type CoreProps = {
  profile: LocationProfile;
};

const CoreSection = (props: { children: ReactNode }) => {
  return <div className="w-full sm:w-1/2 lg:w-1/3 mb-8">{props.children}</div>;
};

const CoreHeading = (props: { children: ReactNode }) => {
  return <h2 className="Heading Heading--sub mb-4 font-lato text-core text-brand-primary">{props.children}</h2>;
};

const Core = (props: CoreProps) => {
  const isDesktopBreakpoint = useBreakpoint("sm");
  const { profile } = props;
  const mappinSVG = (
    <svg
      width="56"
      height="58"
      viewBox="0 0 56 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.0951 1C33.1149 1 37.6595 3.03469 40.9491 6.32432C44.2388 9.61396 46.2734 14.1586 46.2734 19.1784C46.2734 25.9554 40.1704 38.558 28.0941 57C16.019 38.5565 9.91669 25.955 9.91669 19.1784C9.91669 14.1586 11.9514 9.61396 15.241 6.32432C18.5307 3.03469 23.0752 1 28.0951 1Z"
        fill="#0F70F0"
        stroke="black"
        strokeOpacity="0.5"
      />
      <path
        d="M28.095 27.2577C32.5571 27.2577 36.1743 23.6405 36.1743 19.1784C36.1743 14.7163 32.5571 11.0991 28.095 11.0991C23.633 11.0991 20.0157 14.7163 20.0157 19.1784C20.0157 23.6405 23.633 27.2577 28.095 27.2577Z"
        fill="white"
      />
    </svg>
  );
const [displayDriveThruHours, setDisplayDriveThruHours] = useState(false);
const [displayAtmHours, setDisplayAtmHours] = useState(false);
const [displayItmHours, setDisplayItmHours] = useState(false);

const openAtmHours = () => {
  setDisplayAtmHours(!displayAtmHours);
  setDisplayDriveThruHours(false);
  setDisplayItmHours(false);
}

const openItmHours = () => {
  setDisplayItmHours(!displayItmHours);
  setDisplayAtmHours(false);
  setDisplayDriveThruHours(false);
}

const openDisplayDriveThruHours = () => {
  setDisplayDriveThruHours(!displayDriveThruHours);
  setDisplayAtmHours(false);
  setDisplayItmHours(false);
}

  return (
    <section className="Core">
      <div className="container">
        <div className="flex flex-col lg:flex-row">
          {/* Branch Details */}
          <CoreSection>
            {isLocation(profile.meta) ? <CoreHeading>Branch Details</CoreHeading> : <CoreHeading>ATM Details</CoreHeading> }
            <div className="Core-address">
              <AddressLevered address={profile.address} customCssClasses="mb-4"/>
            </div>
            <div className="Core-phone mb-4">
              {profile.mainPhone && (
                <span className="text-primary">
                  <a href={`tel:${profile.mainPhone}`} className="flex flex-row items-center text-brand-tertiary underline hover:no-underline">
                    <FaPhone className="mr-2" />
                    <span>{formatPhoneNumber(profile.mainPhone)}</span>
                  </a>
                </span>
              )}
            </div>

            <div className="Core-ctas flex flex-col">
              
            </div>
          </CoreSection>
          
          {/* Lobby Hours */}
          {(profile.hours || profile.additionalHoursText) && (
            <CoreSection>
              <CoreHeading>Hours</CoreHeading>
              {profile.hours && (
                <HoursTable hours={profile.hours} startOfWeek="Today" />
              )}
              {profile.additionalHoursText && (
                <div className="mt-4">{profile.additionalHoursText}</div>
              )}
            </CoreSection>
          )}
          
          {/* Drive-Thru / ATM Hours */}
          <CoreSection>
            {profile.c_servicesOffered && (
              <div className="Core-services">
                {isLocation(profile.meta) ? <CoreHeading>Branch Services</CoreHeading> : <CoreHeading>Services</CoreHeading>}
                <div className="Core-services mb-8 ml-4">
                  <ul className="list-disc">
                    {profile.c_servicesOffered.slice(0, 5).map((service: string) => (
                      <li className="mr-4" key={service}>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </CoreSection>
        </div>
      </div>
    </section>
  );
};

export default Core;
