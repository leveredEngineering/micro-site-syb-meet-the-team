import type { Coordinate } from "@yext/types";
import StaticMap from "../StaticMap";
import { Promo as PromoProps} from "src/types/entities";
import { LexicalRichText } from "@yext/pages-components";
import { LazyLoadWrapper } from "../common/LazyLoadWrapper";
import { Link } from "@yext/pages-components";
import { MaybeLink } from "../common/MaybeLink";

type MapPromoProps = {
  coordinate: Coordinate;
  promo: PromoProps;
  mapLink?: string;
}
const PromoReverse = ({coordinate, promo, mapLink }: MapPromoProps) => {
  return (
    <section className="Promo py-8 bg-brand-primary">
      <div className="container flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex flex-col gap-8 mt-8 md:mr-16 text-white">
          <h2 className="Heading Heading--head  font-medium font-lato">{promo.title}</h2>
          {promo.description && (
            <div className="text-base font-light font-lato">
              <LexicalRichText serializedAST={JSON.stringify(promo.description.json)} />
            </div>
          )}
          {promo.link && (
            <div className="flex mb-4">
              <Link className="Button--green" href={promo.link.uRL} target="_blank" rel="noreferrer">
                {promo.link.label}
              </Link>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <LazyLoadWrapper>
            <MaybeLink href={mapLink}>
              <StaticMap latitude={coordinate?.latitude} longitude={coordinate?.longitude} zoomLevel={12} width={528} height={352} />
            </MaybeLink>
          </LazyLoadWrapper>
        </div>
      </div>
    </section>
  );
};

export default PromoReverse;
