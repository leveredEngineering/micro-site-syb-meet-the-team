import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using the solid style icon
import { SEARCH_PATH } from "src/config";
import { useTemplateData } from "src/common/useTemplateData";

type CustomSearchBarProps = {
  // Props type definition
  customFormCssClasses?: string;
  customInputCssClasses?: string;
  customButtonClasses?: string;
  ariaLabel: string;
  formId: string; // Required for WCAG complicance if multiple forms are on the same page
};
const CustomSearchBar = ({customFormCssClasses, customInputCssClasses, customButtonClasses, formId, ariaLabel } :CustomSearchBarProps) => {
  const { relativePrefixToRoot } = useTemplateData();
  const searcherPath=`${relativePrefixToRoot}${SEARCH_PATH}`

  const [query, setQuery] = useState(''); // Initial query value
  const handleFormSubmit = (e :any) => {
    e.preventDefault();
    const searchURL = `${searcherPath}?query=${query.toString()}`;
    window.location.href = searchURL;
  };
    return (
      <form className={customFormCssClasses} onSubmit={handleFormSubmit}>
        <label htmlFor={formId} className="sr-only">
          Search
        </label>
        <input 
          id={formId}
          type="text" 
          className={customInputCssClasses} 
          placeholder="Search" 
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className={customButtonClasses} aria-label={ariaLabel}>
          <div className="bg-brand-green h-full flex items-center px-3 py-2">
            <FontAwesomeIcon icon={faSearch} color="white" />
          </div>
        </button>
      </form>
    )
}

export default CustomSearchBar;