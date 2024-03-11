import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import favicon from "src/assets/images/favicon.ico";
import Studio from "src/components/Studio/Studio";
import logo_rebrand from "../assets/images/levered_gold.png";

export const config: TemplateConfig = {
  name: "studio",
};

export const getPath: GetPath<TemplateProps> = () => {
  return `studio`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "levered-up",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: favicon,
        },
      },
    ],
  };
};

const Generator: Template<TemplateRenderProps> = () => {
  return (
    <>
      <div className="container py-8">
        <img src={logo_rebrand} className="h-8 Header-logo" itemProp="logo" />
        <h1 className="font-sans py-2">levered-up.com</h1>
        <Studio />
      </div>
    </>
  );
};

export default Generator;
