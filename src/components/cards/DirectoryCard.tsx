import { HoursStatus } from "@yext/sites-react-components";
import { Link } from "@yext/pages-components";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";
import { CardComponent } from "src/models/cardComponent";
import { useTemplateData } from "src/common/useTemplateData";
import AddressLevered from "../leverageui/AddressLevered";
import { formatPhoneNumber } from "react-phone-number-input";

const DirectoryCard: CardComponent<
  LocationProfile | LiveAPIProfile<LocationProfile>
> = function DirectoryCard(props): JSX.Element {
  const { profile } = props;
  const { relativePrefixToRoot } = useTemplateData();
  const displayName = profile.geomodifier ? profile.geomodifier : profile.address.line1;
  return (
    <div className="Directorycard bg-white px-6 py-8 border h-full flex flex-col justify-between shadow-brand-box">
      <div className="DirectoryCard-top flex flex-col">
        <h3 className="Heading Heading--sub mb-4 font-lato text-core text-brand-primary">
          {/* TODO(tredshaw): add slugs to every location entity */}
          {profile.slug ? (
            <Link
              href={relativePrefixToRoot + profile.slug}
              className="Link Link--primary hover:underline"
              eventName="directorycard-visit-site"
            >
              {/* // TODO(TREDSHAW): geomodifier ? geo : adress.line1 */}
              {displayName}
            </Link>
          ) : (
            displayName
          )}
        </h3>

        {profile.hours && (
          <div className="text-base mb-2">
            <HoursStatus hours={profile.hours} />
          </div>
        )}

        {profile.address && (
          <div className="text-sm">
            <AddressLevered address={profile.address} customCssClasses="mb-2"/>
          </div>
        )}

        {profile.mainPhone && (
          <div className="text-primary">
            <a href={`tel:${profile.mainPhone}`} className="flex flex-row items-center text-brand-tertiary underline hover:no-underline">
              <span>{formatPhoneNumber(profile.mainPhone)}</span>
            </a>
          </div>
        )}
      </div>
      <div className="DirectoryCard-bottom flex w-full mt-4">
        {profile.slug && (
          <Link
            href={relativePrefixToRoot + profile.slug}
            className="Button--green w-full flex justify-center"
            eventName="directorycard-visit-site"
          >
            Visit Site
          </Link>
        )}
      </div>
    </div>
  );
};

export default DirectoryCard;
