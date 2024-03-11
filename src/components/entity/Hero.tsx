import { HoursStatus } from "@yext/sites-react-components";
import { Link, Image } from "@yext/pages-components";
import type { Address, Hours, CTA, Image as ImageType } from "@yext/types";

type HeroProps = {
  name: string;
  address: Address;
  background?: ImageType;
  cta1?: CTA;
  cta2?: CTA;
  hours?: Hours;
  numReviews?: number;
  rating?: number;
};

// Component not used
const Hero = ({name, address, background, hours, numReviews, rating }: HeroProps) => {
  return (
    <section className="Hero py-4">
      <div className="container flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 lg:mt-8 lg:mb-0 lg:mr-8">
          <h1 className="Heading Heading--sub mb-4 sm:mb-0">{name}</h1>
          <div className="Heading Heading--lead mb-4">
            {address.line1}
          </div>
          {hours && (
            <div className="mb-4">
              <HoursStatus
                hours={hours}
                separatorTemplate={() => <span className="bullet" />}
                dayOfWeekTemplate={() => null}
              />
            </div>
          )}
          {rating && (
            <div className="mb-6 lg:mb-8">
              <span> {rating} out of 5 </span>
              <span>({numReviews} reviews)</span>
            </div>
          )}
            <div className="flex flex-col lg:flex-row mb-4 gap-4">
                <Link className="Button Button--primary" href={"https://www.levered.xyz/"} eventName={"primaryCta"} target="_blank" rel="noreferrer">
                  Primary CTA
                </Link>
                <Link className="Button Button--secondary" href={"https://www.levered.xyz/"} eventName={"secondaryCta"} target="_blank" rel="noreferrer">
                  Secondary CTA
                </Link>
            </div>
        </div>
        {background && (
          <div className="w-full lg:w-1/2">
            <Image
              className="w-full h-full object-cover"
              image={background}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
