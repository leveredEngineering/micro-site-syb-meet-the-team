import { LexicalRichText } from "@yext/pages-components";
import { AboutProps } from "src/types/About/About";
import Link from "../common/Link";
import StaticMap from "../StaticMap";

const About = (props :AboutProps) => {
  
  return (
    <div className="About py-8 sm:py-16">
      <div className="container flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center">
            <div className="About-left md:w-2/4">
              <h2 className="Heading Heading--head mb-8">{props.title}</h2>
              <div className="About-description mb-8">
                {props.description && (<LexicalRichText serializedAST={JSON.stringify(props.description.json)} />)}
              </div>
              {props.aboutCTA && (
                <Link link={props.aboutCTA} classes="Link Button Button--primary inline-flex" />
              )}
            </div>
            <div className="About-right w-2/4 hidden md:flex">
              {props.displayMap && (
                <StaticMap latitude={props.coordinate?.latitude} longitude={props.coordinate?.longitude} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
