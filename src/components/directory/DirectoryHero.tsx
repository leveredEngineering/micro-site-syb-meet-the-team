import { useTemplateData } from "src/common/useTemplateData";
import { SEARCH_PATH } from "src/config";
import DirectorySearchBar from "src/components/directory/DirectorySearchBar";

interface DirectoryHeroProps {
  brand?: string;
  title: string;
}

const DirectoryHero = (props: DirectoryHeroProps) => {
  const { relativePrefixToRoot } = useTemplateData();

  return (
    <div className="DirectoryHero bg-brand-primary py-8 md:py-20 px-4 md:px-0">
      <h1 className="mb-6 text-center text-white">
        <div className="Heading Heading--head font-medium flex flex-col text-mobileSectionTitle lg:text-section">
          <span>Find a Levered</span> 
          <span>Branch & ATM Location</span>
        </div>
      </h1>
      <DirectorySearchBar
        placeholder="Search by city and state or ZIP code"
        searcherPath={relativePrefixToRoot + SEARCH_PATH}
      />
    </div>
  );
};

export default DirectoryHero;
