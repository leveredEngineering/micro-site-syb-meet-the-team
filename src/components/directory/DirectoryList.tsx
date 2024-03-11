import { Link } from "@yext/pages-components";
import type { DirectoryProfile } from "src/types/entities";
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using the solid style icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface DirectoryListProps {
  showNumLocs: boolean;
  directoryChildren: DirectoryProfile<never>[];
  relativePrefixToRoot: string;
}

// Skip directory levels that would only render one option.
const getSkipLevelSlug = (child: DirectoryProfile<never>): string => {
  if (child.dm_directoryChildren?.length === 1) {
    return getSkipLevelSlug(child.dm_directoryChildren[0]);
  }
  return child.slug;
};

const DirectoryList = (props: DirectoryListProps) => {
  const { directoryChildren, relativePrefixToRoot } = props;
  return (
    <div className="DirectoryList container my-8">
      <ul className="lg:columns-3 md:columns-2 columns-1 -m-3">
        {directoryChildren.map((child, idx) => (
          <li className="p-3" key={idx}>
            <Link
              className="inline-block flex flex-row border p-3"
              href={relativePrefixToRoot + getSkipLevelSlug(child)}
            >
              <div className="flex items-center p-4">
                <FontAwesomeIcon icon={faLocationDot} color="brand-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-brand-primary hover:underline font-bold font-lato font-core">
                  {child.c_addressRegionDisplayName ?? child.name}
                </span>
                <span>
                  {child.dm_baseEntityCount} {child.dm_baseEntityCount == 1 ? 'Branch' : 'Branches'}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DirectoryList;
