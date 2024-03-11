import { SchemaWrapper, LocalBusiness } from "@yext/schema-wrapper";
import type { SchemaFAQ, TemplateRenderProps } from "src/types/entities";
import parseFAQPayload from "./utilities/extractRichText";

// TODO(tredshaw): refactor.
export function SchemaBuilder(
  data: TemplateRenderProps<Record<string, any>>
): string {
  let geo;
  let hasDriveThroughService = false;

  if (data.document.c_locationServices && hasService(data.document.c_servicesOffered, "Drive Thru")) {
    hasDriveThroughService = true;
  }


  // attempt to parse faq rich text
  let faqSchema;
  try {
    const convertedFAQs = parseFAQPayload(data.document.c_pagesFAQSection);
    console.log(convertedFAQs)
    faqSchema = FAQSchemaBuilder(convertedFAQs);
  } catch (e) {
    console.log('Error parsing FAQ rich text: ', e);
  } 

  if (data.document.geocodedCoordinate) {
    geo = {
      "@type": "GeoCoordinates",
      "latitude": data.document.geocodedCoordinate.latitude,
      "longitude": data.document.geocodedCoordinate.longitude
    }
  }

  const localBusiness = data.document.address
    ? {
        ...LocalBusiness(data, "LocalBusiness"),
        paymentAccepted: data.document.paymentOptions,
        makesOffer: data.document.services,
        currenciesAccepted: "USD", 
        priceRange: "$",
        areaServed: data.document.address.city, 
        brand: "Levered Technology LLC",
        amenityFeature: data.document.c_locationServices,
        geo,
        hasDriveThroughService,
      }
    : null;

  const breadcrumbs = data.document.dm_directoryParents
    ? (
        data.document.dm_directoryParents as Array<{
          slug: string;
          name: string;
        }>
      ).map((parent, idx) => ({
        "@type": "ListItem",
        name: parent.name,
        position: idx + 1,
        item: {
          "@type": "Thing",
          "@id": data.relativePrefixToRoot + parent.slug,
        },
      }))
    : null;

  let isLocation = false;
  if (data.document.meta && data.document.meta.entityType && data.document.meta.entityType.id == 'location') {
    isLocation = true;
  }
  let depositAccountSchema;
  let servicesSchema;
  let atm;
  let notary;

  if (isLocation) {
    depositAccountSchema = generateDepositAccountSchema(data);
    servicesSchema = generateServicesSchema(data, data.document.c_locationServices);
    atm = generateATMSchema(data);
    notary = generateNotary(data);
  }
  
  const json = {
    "@graph": [
      localBusiness && localBusiness,
      faqSchema && faqSchema,
      servicesSchema && servicesSchema,
      atm && atm,
      notary && notary,
      depositAccountSchema && depositAccountSchema,
      breadcrumbs && {
        "@context": "http://www.schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs,
      },
    ],
  };

  return SchemaWrapper(json);
}

function generateServicesSchema(data: any, services: Array<string>) {
  if (!services) {
    // return null if services does not exist in location services
    return;
  }
  const servicesObject = services.map((service) => ({
    "@type": "Service",
    name: service,
  }))

  return servicesObject;
}

function generateATMSchema(data: any) {
  if (!hasService(data.document.c_locationServices, "ATM")) {
    // return null if ATM does not exist in location services
    return;
  }
  const displayName = data.document.geomodifier ? data.document.geomodifier : data.document.address.line1;
  const atm = {
    "@context": "https://schema.org/",
    "@type": "AutomatedTeller",
    "image": "", // LOGO
    "name": data.document.name + " " + displayName,
    "telephone": data.document.mainPhone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.document.address.city,
      "streetAddress": data.document.address.line1,
      "addressRegion": data.document.address.region,
      "postalCode": data.document.address.postalCode,
      "addressCountry": {
        "@type": "Country",
        "name": data.document.address.countryCode
      }
    }
  }
  return atm;
}

function generateDepositAccountSchema(data: any) {
  // TODO(tredshaw): what is this based on? 
  if (!hasService(data.document.c_locationServices, "DepositAccount")) {
    // return null if DepositAccount does not exist in location services
    return;
  }

  const displayName = data.document.geomodifier ? data.document.geomodifier : data.document.address.line1;
  const depositAccount = {
    "@context": "https://schema.org/",
    "@type": "DepositAccount",
    "image": "", // LOGO
    "name": data.document.name + " " + displayName,
  }

  return depositAccount;
}

function generateNotary(data: any) {
  if (!hasService(data.document.c_locationServices, "Notary")) {
    return;
  }
  const displayName = data.document.geomodifier ? data.document.geomodifier : data.document.address.line1;

  const notary = {
    "@context": "https://schema.org/",
    "@type": "Notary",
    "image": "", // LOGO
    "name": data.document.name + " " + displayName,
    "telephone": data.document.mainPhone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.document.address.city,
      "streetAddress": data.document.address.line1,
      "addressRegion": data.document.address.region,
      "postalCode": data.document.address.postalCode,
      "addressCountry": {
        "@type": "Country",
        "name": data.document.address.countryCode
      }
    }
  }

  return notary;
}

function hasService(locationServices :string[], targetService :string) {
  let hasService = false
  try {
    locationServices.forEach((service) => {
      if (service.toLowerCase() === targetService.toLocaleLowerCase()) {
        hasService = true;
      }
    })
  } catch (e) {
    console.log('Error checking if location has service: ', e);
  }
  

  return hasService;
}

const FAQSchemaBuilder = (data: SchemaFAQ[]) => {
  // Your implementation logic here
  return {
    '@context': 'http://www.schema.org',
    '@type': 'FAQPage',
    mainEntity: data.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.acceptedAnswer.text,
      },
    })),
  };
};