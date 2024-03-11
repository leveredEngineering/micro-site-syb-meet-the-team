import { LexicalRichText } from "@yext/pages-components";
import { AboutProps } from "src/types/About/About";
import Link from "../common/Link";
import { Image } from "@yext/pages-components";

const About2 = (props :AboutProps) => {
  
  return (
    <div className="About py-8 sm:py-16 bg-brand-primary text-white">
      <div className="container flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex items-center flex-col md:flex-row">
            <div className="About-left md:w-2/4">
              {props.photo && (
                <Image
                  className="m-auto w-full h-full object-cover"
                  image={props.photo}
                />
              )}
            </div>
            <div className="About-right md:w-2/4 md:flex flex-col p-8">
              <h2 className="Heading Heading--head mb-8">{props.title}</h2>
              <div className="About-description mb-8">
                {props.description && (<LexicalRichText serializedAST={JSON.stringify(props.description.json)} />)}
              </div>
              {props.aboutCTA && (
                <Link link={props.aboutCTA} classes="Link Button Button--secondary inline-flex" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About2;
