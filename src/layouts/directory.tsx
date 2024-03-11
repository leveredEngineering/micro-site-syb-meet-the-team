import type {
  DirectoryProfile,
  LocationProfile,
  TemplateRenderProps,
} from "src/types/entities";
import ErrorBoundaryWithAnalytics from "src/components/common/ErrorBoundaryWithAnalytics";
import Breadcrumbs from "src/components/common/Breadcrumbs";
import DirectoryCard from "src/components/cards/DirectoryCard";
import DirectoryGrid from "src/components/directory/DirectoryGrid";
import DirectoryList from "src/components/directory/DirectoryList";
import DirectoryHero from "src/components/directory/DirectoryHero";
import FAQs from "src/components/entity/FAQs";
import PromoWhite from "src/components/entity/PromoWhite";

interface DirectoryListLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<DirectoryProfile<never>>>;
  showNumLocs: boolean;
}

interface DirectoryGridLayoutProps {
  data: TemplateRenderProps<DirectoryProfile<LocationProfile>>;
  showNumLocs: boolean;
}

type DirectoryLayoutProps = DirectoryListLayoutProps | DirectoryGridLayoutProps;

// Type guard to determine whether to render the DirectoryGrid or DirectoryList component
// based on the type of dm_directoryChildren.
const isDirectoryGrid = (
  children: LocationProfile[] | DirectoryProfile<never>[]
): children is LocationProfile[] => {
  return children.length > 0 && "address" in children[0];
};

const DirectoryLayout = ({ data, showNumLocs }: DirectoryLayoutProps) => {
  const { name, dm_directoryChildren, dm_directoryParents, _site, c_pagesFAQSection, c_promo1 } =
    data.document;
  return (
    <>
      <ErrorBoundaryWithAnalytics name="breadcrumbs">
        <Breadcrumbs
          breadcrumbs={dm_directoryParents || []}
          separator="/"
          className="container flex justify-start"
          addAnalytics={true}
        />
      </ErrorBoundaryWithAnalytics>
      <ErrorBoundaryWithAnalytics name="directory_hero">
        <DirectoryHero title={name} brand={_site.c_brand} />
      </ErrorBoundaryWithAnalytics>

      {dm_directoryChildren && !isDirectoryGrid(dm_directoryChildren) && (
        <ErrorBoundaryWithAnalytics name="directory">
          <DirectoryList
            showNumLocs={showNumLocs}
            directoryChildren={dm_directoryChildren}
            relativePrefixToRoot={data.relativePrefixToRoot}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {dm_directoryChildren && isDirectoryGrid(dm_directoryChildren) && (
        <ErrorBoundaryWithAnalytics name="directory">
          <DirectoryGrid
            CardComponent={DirectoryCard}
            directoryChildren={dm_directoryChildren}
          />
        </ErrorBoundaryWithAnalytics>
      )}
      {c_pagesFAQSection && (
        <ErrorBoundaryWithAnalytics name="directory">
          <FAQs sectionTitle="Frequently Asked Questions" faqs={c_pagesFAQSection} />
        </ErrorBoundaryWithAnalytics>
      )}
      {c_promo1 && (
        <ErrorBoundaryWithAnalytics name="promo1">
          <PromoWhite {...c_promo1} />
        </ErrorBoundaryWithAnalytics>
      )}
    </>
  );
};

export default DirectoryLayout;
