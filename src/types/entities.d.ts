import {
  TemplateProps as InternalTemplateProps,
  TemplateRenderProps as InternalTemplateRenderProps,
} from "@yext/pages/*";
import type { ListingType } from "@yext/pages-components";
import type {
  Address,
  Coordinate,
  CTA,
  Hours,
  ComplexImage,
  WebsiteUrl,
} from "@yext/types";
import { FeaturedFAQs } from "./FAQs/FAQ";
import { LocationOffering } from "./LocationOffering/LocationOffering";

// TODO: potentially move this to @yext/types
// Also we should probably move @yext/types into @yext/pages
// since they're specific to pages streams, not generic kg types
interface BaseProfile {
  readonly id: string;
  readonly businessId: number;
  readonly locale: string;
  readonly siteDomain: string;
  readonly siteId: number;
  readonly siteInternalHostname: string;
  readonly uid: number;
  readonly meta: {
    readonly entityType: {
      readonly id: string;
      readonly uid: number;
    };
    readonly locale: string;
  };
  readonly _site: SiteProfile;
  readonly c_header: SimpleHeader;
}

export interface SiteProfile extends BaseProfile {
  readonly name: string;
  readonly c_brand?: string;
  readonly c_footerLinks?: CTA[];
  readonly c_nearbySectionAPIKey?: string;
  readonly c_searchExperienceAPIKey?: string;
  readonly c_reviewsAPIKey?: string;
  readonly c_footer?: {
    subSections: SubSection[];
  };
  readonly c_bottomFooter?: SubSection;
  readonly c_topHeader?: SubSection;
  readonly c_copyrightText?: RichTextProps;
  readonly c_alertBanner?: RichTextProps;
  readonly c_pagesFAQSection?: any;   // TODO(tredshaw): add type
  readonly c_locationOffering?: LocationOffering;
  readonly c_facebookURL?: string;
  readonly c_instagramURL?: string;
  readonly c_linkedInURL?: string;
  readonly c_twitterURL?: string;
}

export interface SubSection {
  links: Link[]
  title: string
}
export interface Link {
  label: string
  uRL: string
}

export interface LinkYext {
  label: string,
  link: string,
  linkType: string
}

export interface ProductProfile extends BaseProfile {
  readonly name: string;
  readonly primaryPhoto: ComplexImage;
  readonly richTextDescription: string;
  readonly c_primaryCTA: CTA;
}

export interface SearchPageProfile extends BaseProfile {
  c_searchTitle: string;
  c_searchSubTitle: string;
  c_searchPlaceholderText: string;
}

export interface AnswersPageProfile extends BaseProfile {
  c_searchTitle: string;
  c_searchSubTitle: string;
  c_searchPlaceholderText: string;
}

export interface EventDate {
  readonly end: string;
  readonly start: string;
}

export interface EventProfile extends BaseProfile {
  readonly name: string;
  readonly time: EventDate;
  readonly description?: string;
  readonly c_primaryCTA?: CTA;
  readonly photoGallery?: ComplexImage[];
}

export interface FinancialProfessionalProfile extends BaseProfile {
  readonly id: string;
  readonly name: string;
  readonly headshot?: Image;
  readonly mainPhone?: string;
  readonly c_occupation?: string;
  readonly emails?: string[];
  readonly websiteUrl?: WebsiteUrl;
}

interface Insight {
  readonly title: string;
  readonly category?: string;
  readonly photo?: Image;
  readonly date?: string;
  readonly descriptionLong: string;
  readonly descriptionShort?: string;
  readonly cta: CTA;
}

// TODO: generate these automatically from stream definitions
export interface LocationProfile extends BaseProfile {
  readonly name: string;
  readonly geomodifier: string;
  readonly address: Address;
  readonly yextDisplayCoordinate: Coordinate;
  readonly slug: string;
  readonly hours?: Hours;
  readonly additionalHoursText?: string;
  readonly mainPhone?: string;
  readonly fax?: string;
  readonly tollFreePhone?: string;
  readonly mobilePhone?: string;
  readonly ttyPhone?: string;
  readonly localPhone?: string;
  readonly alternatePhone?: string;
  readonly description?: string;
  readonly emails?: string[];
  readonly services: string[];
  readonly photoGallery: ComplexImage[];
  readonly googlePlaceId?: string;
  readonly ref_listings?: ListingType[];
  readonly logo?: Image;
  readonly ref_reviewsAgg?: {
    readonly reviewCount?: number;
  }[];
  readonly paymentOptions?: string;
  // update with new fields from yext account
  readonly geocodedCoordinate?: Coordinate;
  readonly driveThroughHours?: Hours;
  c_servicesOffered?: string[];
  c_pagesFAQSection?: FeaturedFAQs;
  c_belowTheFoldPromotionSection?: PromoProps;
  c_promotionSection3Options?: PromotionSection3Options
  c_locationServices?: any;   // TODO: add type
  readonly c_cTAButton1?: LinkYext;
  // Add custom fields here
  // c_myStringField: string
  readonly c_eventsSection?: {
    readonly title?: string;
    readonly events?: EventProfile[];
  };
  readonly c_bannerSection?: {
    readonly text?: string;
    readonly image?: Image;
  };
  readonly c_heroSection?: {
    readonly background?: Image;
    readonly cta1?: CTA;
    readonly cta2?: CTA;
  };
  readonly c_featuredProductsSection?: {
    readonly title?: string;
    readonly products?: ProductProfile[];
  };
  readonly c_promoSection?: {
    readonly title?: string;
    readonly description?: string;
    readonly image?: Image;
    readonly cta?: CTA;
    readonly googlePlayUrl?: string;
    readonly appStoreUrl?: string;
  };
  readonly c_gallerySection?: {
    readonly title?: string;
    readonly images?: Image[];
  };
  readonly c_teamSection?: {
    readonly title?: string;
    readonly team?: FinancialProfessionalProfile[];
  };
  readonly c_faqSection?: {
    readonly title?: string;
    readonly faqs?: FAQProfile[];
  };
  readonly c_promo1?: Promo;
  readonly c_promo2?: Promo;
  readonly c_aboutSection?: Promo;
  readonly c_locationOffering?: LocationOffering;
  readonly c_nearbySection?: {
    readonly title?: string;
    readonly linkToLocator?: boolean;
    readonly cta?: CTA;
  };
  readonly c_insightsSection?: {
    readonly title?: string;
    readonly cta?: CTA;
    readonly insights?: Insight[];
  };
  readonly c_reviewsSection?: {
    readonly title?: string;
    readonly reviews?: ReviewProfile[];
  };
  readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
  readonly c_searchExperienceAPIKey?: string;
  readonly c_iTMHours?: Hours;
  readonly c_aTMHours?: Hours;
}

export type DirectoryProfile<T> = BaseProfile & {
  readonly name: string;
  readonly dm_baseEntityCount: number;
  readonly dm_childEntityIds?: T[];
  readonly dm_directoryParents?: Array<{ slug: string; name: string }>;
  readonly dm_directoryChildren?: T[];
  readonly slug: string;
  readonly c_addressRegionDisplayName: string;
  readonly c_pagesFAQSection: any;
  readonly c_promo1: any;
};

export interface FAQProfile extends BaseProfile {
  readonly question: string;
  readonly answerV2: string;
}

export interface ReviewProfile {
  apiIdentifier: string;
  authorName: string;
  comments?: {
    authorName: string;
    commentDate: string;
    commentId: number;
    content: string;
  }[];
  content: string;
  entity: {
    id: string;
  };
  rating: number;
  reviewDate: string;
}

export type TemplateProps<T = Record<string, unknown>> = Omit<
  InternalTemplateProps,
  "document"
> & {
  document: T;
};
export type TemplateRenderProps<T = Record<string, unknown>> = Omit<
  InternalTemplateRenderProps,
  "document"
> &
  TemplateProps<T>;

// The data returned by liveAPI has a slightly different meta property.
export type LiveAPIProfile<T = Record<string, unknown>> = Omit<T, "meta"> & {
  meta: {
    entityType: string;
    id: string;
    uid: string;
  };
};

export type ReviewStreamsResponse = {
  meta: {
    uuid: string;
    errors: {
      code: number;
      type: string;
      message: string;
    }[];
  };
  response: {
    count: number;
    docs: ReviewProfile[];
  };
};

export type RichTextProps = {
  json: Json;
}

export type Image = {
  alternateText: string;
  height: number;
  url: string;
  width: number;
}

export type CTADetails = {
  label: string;
  uRL: string;
}

export interface PromoProps {
  cTADetails: CTADetails;
  description: string;
  image: Image;
  title: string;
  isReversed: boolean;
}

export interface PromotionOption {
  cTADetails?: CTADetails;
  description: string;
  image: Image;
  tItle: string;
}

export type PromotionSection3Options = {
  promos: PromotionOption[];
}


export interface RichTextV2Description {
  json: Json
}

export interface Json {
  root: RichTextNode;
}

export interface RichTextNode {
  type: string;
  text?: string;
  children?: RichTextNode[];
  // Add other properties based on your rich text AST
}

export interface SchemaFAQ {
  question: string;
  acceptedAnswer: {
    text: string;
  };
}

export type Meta = {
  entityType: {
    readonly id: string;
    readonly uid: number;
  };
  readonly locale: string;
}

export type Promo = {
  description?: RichTextV2Description;
  title?: string;
  link?: Link;
  image?: Image;
}

export const SchemaFAQ: (data: SchemaFAQ[]) => {
  '@context': string;
  '@type': string;
  mainEntity: {
      '@type': string;
      name: string;
      acceptedAnswer: {
          '@type': string;
          text: string;
      };
  }[];
};

export interface SimpleHeader {
  ctas: Link[];
  logo?: Image;
}

export type GeneratorTemplate = {
  siteName: string;
  siteType: string;
  primaryHex: string;
  secondaryHex: string;
  tertiaryHex: string;
  vertical: string;
  advancedFilter: string;
  apiKey: string;
  customFields?: string[];
} 

export type YextReviewData = {
  firstName: string;
  lastName?: string;
  email: string;
  reviewContent: string;
  rating: number;
}