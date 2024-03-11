import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import { ButtonConfig, HeadingConfig, LinkConfig } from "./tailwind";
import { styleguidePlugin } from "./tailwindPlugin";
import generatorData from './src/generator.json'

export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'header-hover': 'rgba(10, 10, 10, 0.6)',
      },
      fontFamily: {
        primary: "'Lato','Helvetica','system'",
        secondary: "'Arial','Helvetica','sans-serif','system'",
        catamaran: "'Catamaran', arial",
        oswald: "'Oswald', 'sans-serif'",
      },
      fontSize: {
        sm: ["14px", "22px"],
        base: ["16px", "24px"],
        lg: ["18px", "24px"],
        article: ["26px", "32px"],
        faq: ["24px", "24px"],
        core: ["20px", "30px"],
        sectionTitle: ["40px", "48px"],
        mobileSectionTitle: ["30px", "36px"]
      },
      colors: {
        text: "black",
        "brand-primary": generatorData.primaryHex,
        "brand-secondary": generatorData.secondaryHex,
        "brand-tertiary": generatorData.tertiaryHex,
        "brand-green": "#3eb489",
        "brand-green-dark": "#294f29",
        "brand-red": "#a71d31",
        "brand-gray": {
          100: "#F7F7F7",
          200: "#EDEDED",
          300: "#4a4a4a",
          400: "#767676",
          500: "#cacaca",
          600: "#272425",
          700: "#F5F5F5",
        },
      },
      buttons: (theme: PluginAPI["theme"]): ButtonConfig => ({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: `${theme("spacing.2")} ${theme("spacing.6")}`,
        fontWeight: theme("fontWeight.bold"),
        borderRadius: "50px",
        variants: {
          primary: {
            backgroundColor: theme("colors.brand-primary"),
            color: "white",
            border: "none",
          },
          secondary: {
            backgroundColor: "white",
            color: theme("colors.brand-secondary"),
            border: `2px solid ${theme("colors.brand-primary")}`,
            "&:hover": {
              backgroundColor: theme("colors.brand-secondary"),
              color: "white",
              border: `2px solid ${theme("colors.brand-primary")}`,
            },
          },
          green: {
            backgroundColor: theme("colors.brand-green"),
            fontFamily: theme("fontFamily.catamaran"),
            fontSize: '1.1rem',
            color: "white",
            padding: '0.75rem 1.5625rem',
            "&:hover": {
              backgroundColor: theme("colors.brand-green-dark"),
              color: "white",
            },
          },
        },
      }),
      headings: (theme: PluginAPI["theme"]): HeadingConfig => ({
        fontFamily: theme("fontFamily.primary"),
        fontWeight: theme("fontWeight.bold"),
        variants: {
          sub: {
            fontSize: "1.25rem",
            lineHeight: "1.4",
            "@screen sm": {
              fontSize: "1.5rem",
              lineHeight: "1.25",
            },
          },

          head: {
            fontSize: "2.125rem",
            lineHeight: "1.18",
            "@screen sm": {
              fontSize: "2.5rem",
              lineHeight: "1.33",
            },
          },
          primary: {
            fontSize: "2.125rem",
            lineHeight: "1.18",
            "@screen sm": {
              fontSize: "3.5rem",
              lineHeight: "1.33",
            },
            fontFamily: theme("fontFamily.oswald"),
          },
          lead: {
            fontSize: "1.75rem",
            lineHeight: "1.14",
            "@screen sm": {
              fontSize: "3rem",
              lineHeight: "1.33",
            },
          },
        },
      }),
      links: (theme: PluginAPI["theme"]): LinkConfig => ({
        variants: {
          primary: {
            color: theme("colors.brand-primary"),
            "&:hover": {
              color: theme("colors.brand-secondary"),
            },
          },
          secondary: {
            color: theme("colors.brand-secondary"),
            "&:hover": {
              color: theme("colors.brand-primary"),
            },
          },
          breadcrumbs: {
            color: theme("colors.brand-primary"),
            fontWeight: theme("fontWeight.bold"),
          },
          underline: {
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          },
          underlineInverse: {
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          },
        },
      }),
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
        },
      },
      boxShadow: {
        "brand-shadow": "0 -1px 0 0 #CCC inset",
        "brand-box": "0 0 6px 2px rgba(10,10,10,0.05)",
      },
    },
  },
  plugins: [styleguidePlugin()],
} as Config;
