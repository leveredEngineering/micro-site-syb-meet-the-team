import { useState, useRef } from "react";
import { GoChevronDown } from "react-icons/go";
import c from "classnames";
import classNames from "classnames";
import { FAQv2 } from "src/types/FAQs/FAQ";
import { LexicalRichText } from "@yext/pages-components";

const FAQ = ({ question, answerV2 }: FAQv2) => {
  const [isOpen, setIsOpen] = useState(false);
  const faqRef = useRef<HTMLDivElement>(null);

  const faqToggle = () => {
    if (faqRef.current != null) {
      if (!isOpen) {
        const ansHeight = faqRef.current.scrollHeight;
        faqRef.current.style.height = `${ansHeight}px`;
      } else {
        faqRef.current.style.height = `0`;
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button
        className="justify-between w-full flex py-4 cursor-pointer font-bold text-lg text-left"
        onClick={faqToggle}
      >
        <div className="text-brand-primary font-lato font-medium text-lg">
          {question}
        </div>
        <div>
          <GoChevronDown
            className={c(
              "transition-transform duration-500 text-brand-primary",
              { "rotate-180": isOpen }
            )}
            size="1.5em"
          />
        </div>
      </button>
      <div
        ref={faqRef}
        className={classNames(
          "overflow-hidden duration-500 h-0 transition-all",
          { invisible: !isOpen }
        )}
      >
        <div className="mb-4">
          <LexicalRichText serializedAST={JSON.stringify(answerV2.json)} />
        </div>
      </div>
    </div>
  );
};

export default FAQ;
