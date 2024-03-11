import { HoursStatus } from "@yext/sites-react-components";
import type { Address, Hours, CTA, Image as ImageType } from "@yext/types";
import StaticMap from "../StaticMap";
import type { Coordinate } from "@yext/types";
import { ListingType, getDirections, Link } from "@yext/pages-components";
import { MaybeLink } from "../common/MaybeLink";
import { LocationProfile } from "src/types/entities";

type NapProps = {
  name: string;
  geomodifier?: string;
  address: Address;
  background?: ImageType;
  cta1?: CTA;
  cta2?: CTA;
  hours?: Hours;
  numReviews?: number;
  rating?: number;
  coordinate?: Coordinate
  ref_listings?: ListingType[];
  googlePlaceId?: string;
  profile: LocationProfile;
};

const Nap = ({name, geomodifier, address, hours, coordinate, ref_listings, googlePlaceId, profile }: NapProps) => {
  let mapLink;
  if (address) {
    mapLink = getDirections(
      address,
      ref_listings,
      googlePlaceId
    );
  }
const displayName = geomodifier ? geomodifier : address.line1;
  return (
    <section className="Nap py-4">
      <div className="container flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:mt-8 mb-4 lg:mb-8 lg:mb-0 lg:mr-8 ">
          <h1 className="Heading Heading--sub mb-4 sm:mb-0">{name}</h1>
          <div className="Heading Heading--primary text-brand-primary">
            {displayName}
          </div>
          {hours && (
            <div>
              <HoursStatus
                hours={hours}
                separatorTemplate={() => <span className="bullet" />}
                dayOfWeekTemplate={() => null}
              />
            </div>
          )}
          <div className="flex flex-col lg:flex-row my-4">
            <div className="flex mb-4 mr-6">
              <Link className="Button--green" 
                    href={`${getDirections(
                          profile.address,
                          profile.ref_listings,
                          profile.googlePlaceId
                        )}`} 
                    eventName={"getDirections"} 
                    target="_blank" 
                    rel="noreferrer"
              >
                Get Directions
              </Link>
            </div>
            {profile.c_cTAButton1 && (
              <div className="flex mb-4">
                <Link className="Button--green" href={profile.c_cTAButton1.link} eventName={profile.c_cTAButton1.label} target="_blank" rel="noreferrer">
                  {profile.c_cTAButton1.label}
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="w-full lg:w-1/2 flex-col text-center justify-center align-center hidden lg:flex">
          <div className="Nap-map">
            <MaybeLink href={mapLink}>
              <StaticMap latitude={coordinate?.latitude} longitude={coordinate?.longitude} height={220} width={600} zoomLevel={15}/>
            </MaybeLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Nap;
