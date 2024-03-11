import * as React from "react";
import Banner from "../components/Banner";
import DirectoryRootGrid from "../components/DirectoryRootGrid";
import Favicon from "../assets/images/yext-favicon.ico";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import DirectoryLayout from "src/layouts/directory";
import { Main } from "src/layouts/main";
import type {
  DirectoryProfile,
  TemplateProps,
  TemplateRenderProps,
} from "src/types/entities";
import { defaultHeadConfig } from "src/common/head";
import PlatformDebugModal from "src/components/leverageui/PlatformDebugModal";
import EntityLayout from "src/layouts/entity";
import generatorData from '../generator.json'
import { getFields } from "src/common/utilities/getFields";

const advancedFilter = generatorData.advancedFilter ? generatorData.advancedFilter : "1352136358";
export const config: TemplateConfig = {
  stream: {
    $id: "root-stream",
    filter: {
      savedFilterIds: [advancedFilter],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> =  ({ document }) => {
  return document.slug;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos directory home page.",
        },
      },
      {
        type: "link",
        attributes: {
          rel: "icon",
          type: "image/x-icon",
          href: Favicon,
        },
      },
    ],
  };
};

/**
 * Required only when data needs to be retrieved from an external (non-Knowledge Graph) source.
 * If the page is truly static this function is not necessary.
 *
 * This function will be run during generation and pass in directly as props to the default
 * exported function.
 */
export const transformProps: TransformProps<
  TemplateRenderProps<DirectoryProfile<never>>
> = async (data) => {
  const { name } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      dm_directoryParents: [{ name: name, slug: "" }],
    },
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Root: Template<
  TemplateRenderProps<DirectoryProfile<DirectoryProfile<never>>>
> = (data) => {
  return (
    <Main data={data}>
      <PlatformDebugModal data={data} />
    </Main>
  );
};

export default Root;
