import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { BrowserRouter } from "react-router-dom";
import { getRuntime } from "@yext/pages/util";
import { SearchPageProfile, TemplateRenderProps } from "src/types/entities";
import { getSearchProvider } from "src/config";
import Locator from "src/components/search/Locator";
import { useEffect, useState } from "react";

interface SearchLayoutProps {
  data: TemplateRenderProps<SearchPageProfile>;
}

const SearchLayout = ({ data }: SearchLayoutProps) => {
  const { document } = data;
  const [runtime, setRuntime] = useState("");
  const searcher = getSearchProvider("096b8f3b3b696f6b6b9d43b909c52483", document.meta.locale);

  // if (!_site.c_searchExperienceAPIKey) {
  //   console.error("Add the search experience API key to the Site Entity");
  // }

  useEffect(() => {
    setRuntime(getRuntime().name);
  }
  , []);

  return (
    <>
      <SearchHeadlessProvider searcher={searcher}>
        {runtime === "browser" && (
          <BrowserRouter>
            <Locator
              title={"SYB"}
              subTitle={"Demo Search"}
              placeholderText={"Miami, FL"}
            />
          </BrowserRouter>
        )}
      </SearchHeadlessProvider>
    </>
  );
};

export default SearchLayout;
