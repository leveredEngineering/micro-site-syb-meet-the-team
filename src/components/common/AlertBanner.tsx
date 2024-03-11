import { RichTextProps } from "src/types/entities";
import { LexicalRichText } from "@yext/pages-components";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import c from "classnames";

type AlertBannerProps = {
  richText: RichTextProps;
  dismissible?: boolean;
};

// dismissible should hide the banner when clicked
const AlertBanner = ({ richText, dismissible } : AlertBannerProps) => {
  const [hidden, setHidden] = useState(false);
  
  return (
    <div className={c(
      "flex items-center bg-brand-tertiary",
      { "hidden": hidden }
    )}>
      <div className="AlertBanner text-white text-center py-4 px-8 flex justify-between">
        <div className="AlertBanner-description">
          {richText && (<LexicalRichText serializedAST={JSON.stringify(richText)} />)}
        </div>
        {dismissible && (
          <button onClick={() => setHidden(true)} className="AlertBanner-close" aria-label="Close Banner">
            <span className="sr-only">Close Banner</span>
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
}

export default AlertBanner;
