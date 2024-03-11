import { provideHeadless } from "@yext/search-headless-react";
import type { ConfigurationProviderContextType } from "@yext/sites-react-components";
// import { SandboxEndpoints } from "@yext/search-headless-react"; // Add if using a sandbox account
import customData from './generator.json';
import { GeneratorTemplate } from "./types/entities";
const config: ConfigurationProviderContextType = {
  components: {},
};

export default config;

// Path for the search page.
// Exported here since it's required across multiple pages such as the nearby section and directory search bar.
export const SEARCH_PATH = "search";
// Static filter field for FilterSearch.
export const LOCATOR_STATIC_FILTER_FIELD = "builtin.location";
// Entity type for FilterSearch
export const LOCATOR_ENTITY_TYPE = "location";
// Radius used for the locator geolocate button.
export const GEOLOCATE_RADIUS = 50;

export const getSearchProvider = (apiKey: string, locale: string, experienceKey: string) =>
  // TODO(tredshaw): Replace with your own API key and experience key
  provideHeadless({
    apiKey: apiKey,
    experienceKey: experienceKey,
    locale,
    verticalKey: "locations",
    // experienceVersion: "<REPLACE-ME>",
    // endpoints: SandboxEndpoints // Add if using a sandbox account
  });

  // fetch data in generator.json
  export const getGeneratorData = () => {
    const generatorData : GeneratorTemplate = customData;
    console.log("generator data: ", generatorData);

    return generatorData;
  }