import type { TemplateRenderProps, LocationProfile } from "src/types/entities";
import { LazyLoadWrapper } from "src/components/common/LazyLoadWrapper";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";

import Banner from "src/components/entity/Banner";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import Core from "src/components/entity/Core";
import FAQs from "src/components/entity/FAQs";
import Nearby from "src/components/entity/Nearby";
import Promo from "src/components/entity/Promo";
import Nap from "src/components/entity/Nap";
import BranchOffering from "src/components/entity/BranchOffering";
import PromoReverse from "src/components/entity/PromoReverse";
import PromoWhite from "src/components/entity/PromoWhite";
import { getDirections } from "@yext/pages-components";
import MailChimp from "src/components/leverageui/Mailchimp";
import Reviews from "src/components/leverageui/Reviews";

interface EntityLayoutProps {
  data: TemplateRenderProps<LocationProfile>;
}

const EntityLayout = ({ data }: EntityLayoutProps) => {
  // extract profile fields (present on most entity types)
  const {
    id,
    geocodedCoordinate,
    name,
    geomodifier,
    address,
    hours,
    dm_directoryParents: directoryParents,
    ref_listings,
    googlePlaceId
  } = data.document;

  // pull account specific custom fields
  const {
    c_bannerSection: banner,
    c_heroSection: hero,
    c_promo1: promo1,
    c_promo2: promo2,
    c_aboutSection: about,
    c_pagesFAQSection: faqs,
    c_locationOffering: locationOffering,
    c_nearbySection: nearby,
  } = data.document;

  // Conditional Logic the Determines if a section has enough data to justify rendering
  const showBanner = banner?.text && banner?.image;
  const showPromo1 = promo1?.title && promo1?.description?.json != null;
  const showPromo2 = promo2?.title && promo2?.description?.json != null;
  const showAbout = about?.title && about?.description?.json != null;
  const showFAQ = faqs;

  let mapLink;
  if (address && ref_listings && googlePlaceId) {
    mapLink = getDirections(
      address,
      ref_listings,
      googlePlaceId
    );
  }

  return (
    <>
      {showBanner && (
        <ErrorBoundaryWithAnalytics name="banner">
          <Banner text={banner.text} image={banner.image} />
        </ErrorBoundaryWithAnalytics>
      )}
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={directoryParents || []}
          separator="/"
          className="container"
          addAnalytics={true}
        />
      </ErrorBoundaryWithAnalytics>
      <Reviews />
      <ErrorBoundaryWithAnalytics name="hero">
        <Nap
          name={name}
          cta1={hero?.cta1}
          cta2={hero?.cta2}
          address={address}
          background={hero?.background}
          hours={hours}
          numReviews={21}
          rating={4.5}
          coordinate={geocodedCoordinate}
          ref_listings={ref_listings}
          googlePlaceId={googlePlaceId}
          geomodifier={geomodifier}
          profile={data.document}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="core">
        <Core profile={data.document} />
      </ErrorBoundaryWithAnalytics>
      {showPromo1 && (
        <ErrorBoundaryWithAnalytics name="promo1">
          <Promo {...promo1} />
        </ErrorBoundaryWithAnalytics>
      )}
      {locationOffering && (
        <ErrorBoundaryWithAnalytics name="BranchOffering">
          <BranchOffering 
            detailCard={locationOffering.detailCard}
            mainDescription={locationOffering.mainDescription}
            mainTitle={locationOffering.mainTitle}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {showAbout && geocodedCoordinate && (
        <ErrorBoundaryWithAnalytics name="aboutSection">
          <PromoReverse coordinate={geocodedCoordinate} promo={about} mapLink={mapLink} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showFAQ && (
        <ErrorBoundaryWithAnalytics name="faqs">
          <FAQs sectionTitle="Frequently Asked Questions" faqs={faqs} />
        </ErrorBoundaryWithAnalytics>
      )}
      {showPromo2 && (
        <ErrorBoundaryWithAnalytics name="promo2">
          <PromoWhite {...promo2} />
        </ErrorBoundaryWithAnalytics>
      )}
      <LazyLoadWrapper>
          <Nearby
            title={nearby?.title}
            linkToLocator={nearby?.linkToLocator}
            buttonText={nearby?.cta?.label}
            buttonLink={nearby?.cta?.link}
            coordinate={geocodedCoordinate}
            id={id}
          />
      </LazyLoadWrapper>
      {/* <MailChimp /> */}
    </>
  );
};

export default EntityLayout;
