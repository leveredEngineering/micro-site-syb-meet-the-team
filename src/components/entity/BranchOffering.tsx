import React from 'react';
import { DetailCard, LocationOffering } from 'src/types/LocationOffering/LocationOffering';
import { LexicalRichText } from '@yext/pages-components';
import {
  Link,
} from "@yext/pages-components";

const BranchOffering = ({detailCard, mainDescription, mainTitle} :LocationOffering) => {

  const detailCards = detailCard; //TODO(tredshaw): fix custom field 

  return (
    <section className="my-8">
      <div className="BranchOffering container flex flex-col">
        {mainTitle && (
          <h2 className="mb-8 Heading--primary text-brand-primary BranchOffering-title pb-6">
            {mainTitle}
          </h2>
        )}
        {mainDescription && (
          <div className="mb-8">
            <LexicalRichText serializedAST={JSON.stringify(mainDescription.json)} />            
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {detailCards.map((card :DetailCard) => (
            <div className="BranchOffering-article shadow-brand-box flex flex-col p-8">
              <h4 className="mb-4 font-primary text-brand-primary font-bold text-article">
                {card.title}
              </h4>
              <div className="mb-2 font-primary text-brand-gray-600">
                {card.description && (<LexicalRichText serializedAST={JSON.stringify(card.description.json)} />)}
              </div>
                {card.link && (
                  <div className="BranchOffering-ctaWrapper flex">
                    <Link className="Button--green" href={card.link?.uRL} target="_blank" rel="noreferrer">
                      {card.link?.label}
                    </Link>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BranchOffering;