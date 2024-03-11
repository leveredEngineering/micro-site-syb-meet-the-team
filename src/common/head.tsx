import type { TemplateRenderProps, HeadConfig, Tag } from "@yext/pages";
import { SchemaBuilder } from "src/common/schema";
import favicon from "src/assets/images/favicon.ico";

const dnsPrefetchTags: Tag[] = [
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//www.yext-pixel.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//a.cdnmktg.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//a.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//dynl.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//dynm.mktgcdn.com" },
  },
  {
    type: "link",
    attributes: { rel: "dns-prefetch", href: "//www.google-analytics.com" },
  },
];

const defaultHeadTags: Tag[] = [
  {
    type: "meta",
    attributes: {
      "http-equiv": "X-UA-Compatible",
      content: "IE=edge",
    },
  },
  ...dnsPrefetchTags,
  {
    type: "meta",
    attributes: {
      name: "format-detection",
      content: "telephone=no",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "og:type",
      content: "website",
    },
  },
  {
    type: "meta",
    attributes: {
      property: "twitter:card",
      content: "summary",
    },
  },
];

export function defaultHeadConfig(
  data: TemplateRenderProps,
  additionalTags?: Tag[]
): HeadConfig {
  const logoTags: Tag[] = data.document?.logo
    ? [
        {
          type: "meta",
          attributes: {
            property: "og:image",
            content: data.document.logo.image.url,
          },
        },
      ]
    : [];

  const geoTags: Tag[] = data.document?.yextDisplayCoordinate
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.position",
            content: `${data.document.yextDisplayCoordinate.lat},${data.document.yextDisplayCoordinate.long}`,
          },
        },
      ]
    : [];
  const addressTags: Tag[] = data.document.address
    ? [
        {
          type: "meta",
          attributes: {
            name: "geo.placename",
            content: `${data.document.address.city},${data.document.address.region}`, // TODO: dono't use abbreviated form here when it's available
          },
        },
        {
          type: "meta",
          attributes: {
            name: "geo.region",
            content: `${data.document.address.countryCode}-${data.document.address.region}`,
          },
        },
      ]
    : [];

  return {
    title: metaTitle(data),
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1, maximum-scale=5",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: metaTitle(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: metaDescription(data),
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: canonicalUrl(data),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: canonicalUrl(data),
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          type: "image/ico",
          href: favicon,
        },
      },
      ...logoTags,
      ...defaultHeadTags,
      ...geoTags,
      ...addressTags,
      ...alternates(data),
      ...(additionalTags || []),
    ],
    other: [googleAnalytics(), yaScript(), googleFonts(), SchemaBuilder(data)].join("\n"),
    // other: [googleAnalytics(), yaScript(), googleFonts()].join("\n"),
  };
}

function yaScript(): string {
  return `<script>window.yextAnalyticsEnabled=false;window.enableYextAnalytics=()=>{window.yextAnalyticsEnabled=true}</script>`;
}

function dynamicStyles(): string {
  // TODO(tredshaw): could use something like this to drive styles from custom fields
  return `<style>
          :root{
            --brand-primary: #03355e;
            --brand-secondary: #073866;
            --brand-tertiary: #1d6596;
          }
          </style>`
}

// function searchScript(): string {
//   const initAnswers = `<script>
//       function initAnswers() {
//         console.log("initAnswers...", document.querySelector(".search-form"));
//         ANSWERS.init({
//           apiKey: "4b6394fa6678e07e2a9e3c70424af313",
//           experienceKey: "syb-site-search",
//           experienceVersion: "PRODUCTION",
//           locale: "en",
//           businessId: "3827925",
//           onReady: function() {
//             ANSWERS.addComponent("SearchBar", {
//               container: ".search-form",
//               name: "search-bar",
//               redirectUrl: "/search", // UPDATE ME
//               placeholderText: "Search...",
//             });
//           },
//         });
//       }
//     </script>`
//   const searchBar = `<script src="https://assets.sitescdn.net/answers-search-bar/v1.5/answers.min.js" onload="initAnswers()" defer></script>`;
//   return [initAnswers, searchBar].join("\n");
// }

function googleAnalytics(): string {
  // from SYB
  const googleAnalyticsTag = `<script async="" src="https://www.googletagmanager.com/gtag/js?id=${YEXT_PUBLIC_GOOGLE_ANALYTICS_ID}"></script>`;
  const gtmScript = `<script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${YEXT_PUBLIC_GOOGLE_ANALYTICS_ID}'); </script>`;

  
  const scripts = [googleAnalyticsTag, gtmScript].join("\n");
  return scripts
}


function metaTitle(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_pageTitle } = data.document;
  if ( c_pageTitle ) return c_pageTitle;

  return "";
}

function metaDescription(data: TemplateRenderProps): string {
  // 1. Check for meta field on the entity
  const { c_metaDescription } = data.document;
  if (c_metaDescription) return c_metaDescription;

  // 2. Check for breadcrumbs
  const { dm_directoryParents } = data.document;
  if (dm_directoryParents) {
    return `${dm_directoryParents
      .map((crumb: { name: string }) => crumb.name)
      .join(", ")}.`;
  }

  return "";
}

function canonicalUrl(data: TemplateRenderProps, locale?: string): string {
  let pagePath = data.path;

  const alfs = data.document?.alternateLanguageFields;
  if (alfs && locale) {
    const altLocalePath = alfs[locale]?.slug;
    if (altLocalePath) {
      pagePath = altLocalePath;
    }
  }

  if (pagePath === "index.html") {
    pagePath = "";
  }

  return `https://${data.document.siteDomain}/${pagePath}`;
}

function alternates(data: TemplateRenderProps): Tag[] {
  const thisLocale = data.document.locale;
  const alternateLocales: string[] = Object.keys(
    data.document?.alternateLanguageFields || {}
  );
  const alternateLinks: Tag[] = alternateLocales
    .filter((locale) => locale !== thisLocale)
    .map((locale) => ({
      type: "link",
      attributes: {
        rel: "alternate",
        hreflang: locale,
        href: canonicalUrl(data, locale),
      },
    }));
  return alternateLinks;
}
// returns a list of google fonts to be used in the head
function googleFonts():string {
  const fonts = [
    `<link rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700">`,
    `<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato:400,700&display=swap">`,

    // Oswald
    `<link rel="stylesheet" media="all" href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&amp;family=EB+Garamond&amp;family=Oswald&amp;display=swap">`,

    `<link rel="stylesheet" media="all" href="https://fonts.googleapis.com/css?family=Catamaran:200,300,400,500,600,700|Oswald:500&amp;display=swap">`

  ];

  return fonts.join("\n");
}