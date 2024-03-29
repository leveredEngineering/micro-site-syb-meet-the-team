import { useEffect, useState } from "react";
import type { Coordinate } from "@yext/types";
import { Link } from "@yext/pages-components";
import { SEARCH_PATH } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import type { LiveAPIProfile, LocationProfile } from "src/types/entities";
import classNames from "classnames";
import DirectoryCard from "src/components/cards/DirectoryCard";

// Configure nearby locations section liveapi params and endpoint
// For all available params see: https://hitchhikers.yext.com/docs/contentdeliveryapis/legacy/entities#operation/geoSearchEntities

const getConfig = (api_key: string) => {
  return {
    endpoint: "https://cdn.yextapis.com/v2/accounts/me/entities/geosearch",
    params: {
      api_key,
      entityTypes: "location",
      limit: "4",
      radius: "50",
      savedFilterIds: "1349798591",
      v: "20231127",
    },
  };
};

type NearbyProps = {
  title?: string;
  linkToLocator?: boolean;
  buttonText?: string;
  buttonLink?: string;
  coordinate?: Coordinate;
  id: string;
};

const Nearby = (props: NearbyProps) => {
  const {
    title = "Nearby Stock Yards Branch & Trust Locations",
    linkToLocator = true,
    buttonText = "Find a Location",
    buttonLink,
    coordinate,
    id,
  } = props;
  const { document, relativePrefixToRoot } = useTemplateData();
  // const apiKey = document._site.c_nearbySectionAPIKey;
  const apiKey = 'da791fd9308ea0eee05ed4fb4419a54a';
  const [nearbyLocations, setNearbyLocations] = useState<
    LiveAPIProfile<LocationProfile>[]
  >([]);

  useEffect(() => {
    
    if (!coordinate || !apiKey) {
      return;
    }

    const config = getConfig(apiKey);
    const searchParams = new URLSearchParams({
      ...config.params,
      location: `${coordinate.latitude},${coordinate.longitude}`,
      filter: JSON.stringify({ "meta.id": { "!$eq": `${id}` } }),
    });
    fetch(`${config.endpoint}?${searchParams.toString()}`)
      .then((resp) => resp.json())
      .then((data) => setNearbyLocations(data.response.entities || []))
      .catch((error) => console.error(error));
  }, [coordinate, id, apiKey]);

  const renderLocatorLink = (cls?: string) => {
    return linkToLocator ? (
      <Link
        href={buttonLink ?? relativePrefixToRoot + SEARCH_PATH}
        className={classNames("Button Button--primary mt-8 sm:mt-0", cls)}
      >
        {buttonText}
      </Link>
    ) : null;
  };

  if (!nearbyLocations.length) {
    return null;
  }

  return (
    <div className="py-8 sm:py-16 Nearby">
      <div className="container">
        <div className="flex justify-center items-center mb-8">
          <h2 className="Heading Heading--head lg:Nearby-title flex text-center text-brand-primary text-mobileSectionTitle lg:text-sectionTitle font-medium">{title}</h2>
        </div>
        <ul className="flex flex-wrap -m-4">
          {nearbyLocations.map((location) => (
            <li key={location.meta.id} className="p-4 w-full sm:w-1/2 lg:w-1/4">
              <DirectoryCard profile={location} />
            </li>
          ))}
        </ul>
        {/* {renderLocatorLink("sm:hidden")} */}
      </div>
    </div>
  );
};

export default Nearby;
