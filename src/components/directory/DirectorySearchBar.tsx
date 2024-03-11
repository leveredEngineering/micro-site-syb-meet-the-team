import {
  getSearchProvider,
} from "src/config";
import { useTemplateData } from "src/common/useTemplateData";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import { useSearchActions } from "@yext/search-headless-react";
import {
  onSearchFunc,
  SearchBar,
} from "@yext/search-ui-react";

interface DirectorySearchBarProps {
  placeholder: string;
  searcherPath: string;
}

const DirectorySearchBar = (props: DirectorySearchBarProps) => {
  const { document } = useTemplateData();

  if (!document._site.c_searchExperienceAPIKey) {
    console.error("Add the search experience API key to the Site Entity");
  } else {
    console.warn("Search Key: ", document._site.c_searchExperienceAPIKey)
  }

  const searcher = getSearchProvider(
    document._site.c_searchExperienceAPIKey ?? "",
    document.meta.locale, 
    "syb-site-search"
  );

  return (
    <SearchHeadlessProvider searcher={searcher}>
      <DirectorySearchBarInternal {...props} />
    </SearchHeadlessProvider>
  );
};

const DirectorySearchBarInternal = (props: DirectorySearchBarProps) => {
  const searchActions = useSearchActions();
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.executeVerticalQuery();
    const queryParams = new URLSearchParams(window.location.search);
  
    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
  
    // Update the URL to use "/search" with the new query parameters
    const newUrl = `/search?${queryParams.toString()}`;
    window.location.href = newUrl;
  };


  return (
    <div className="flex items-center justify-center">
      <div className="w-[350px!important] md:w-[425px!important] justify-center h-[54px]">
        <SearchBar onSearch={handleSearch} hideRecentSearches={true} placeholder="Search by City, State, ZIP Code or Branch Name"/>
      </div>
    </div>
  );
};

export default DirectorySearchBar;
