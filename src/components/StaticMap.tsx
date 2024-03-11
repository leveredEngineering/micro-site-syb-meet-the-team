import * as React from "react";

export interface StaticMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
  height?: number | undefined;
  width?: number | undefined;
  zoomLevel: number; // 14 is a good default zoom level
}

// API KEY is based on branch setting or .env locally
// Learn more here: https://hitchhikers.yext.com/docs/pages/environment-variables/
const mapsApiKey = YEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const StaticMap = (props: StaticMapProps) => {
  const useWidth = props.width ?? 300;
  const useHeight = props.height ?? 200;
  const { latitude, longitude } = props;
  if (!mapsApiKey) {
    return (
      <>
        <div className="w-full">
          It looks like you need a Maps API key. Grab an API Key from Google
          Maps and add it to your .env file
        </div>
      </>
    );
  }

  return (
    <>
      <img
        className="hidden md:flex w-full"
        width={useWidth}
        height={useHeight}
        alt="location map"
        src={
          "https://maps.googleapis.com/maps/api/staticmap?center=" +
          `${latitude}` +
          "," +
          `${longitude}` +
          `&zoom=${props.zoomLevel}&size=${useWidth}x${useHeight}&maptype=roadmap&markers=color:red%7Clabel:LL%7C` +
          `${latitude}` +
          "," +
          `${longitude}` +
          `&key=${mapsApiKey}`
        }
      ></img>
    </>
  );
};

export default StaticMap;
