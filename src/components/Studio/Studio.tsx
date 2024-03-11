import React, { useEffect, useState } from 'react';
import { JsonView, collapseAllNested, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { FaInfoCircle } from 'react-icons/fa';
import spinner from "../../assets/images/spinner.gif";
import { GeneratorTemplate } from 'src/types/entities';
import { dynamic } from '@yext/pages/util';

const Tooltip = dynamic(
  () => import("@material-tailwind/react/components/Tooltip")
);

type GeneratorResponse = {
  message: string;
  repoUrl?: string;
}

const Studio = () => {
  // Form Data
  const [siteName, setSiteName] = useState("");
  const [color1, setColor1] = useState("#03355e");
  const [color2, setColor2] = useState("#808080");
  const [color3, setColor3] = useState("#3eb489");
  const [siteType, setSiteType] = useState("single_location_template");
  const [vertical, setVertical] = useState("financial_services");
  const [advancedFilter, setAdvancedFilter] = useState("1352136358")
  const [apiKey, setApiKey] = useState("")
  const [customFields, setCustomFields] = useState(["c_servicesOffered", "c_mainPagesCTA", "c_about", "c_header"])

  const [response, setResponse] = useState<GeneratorResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e :any) => {
    e.preventDefault();

    const generatorTemplateData :GeneratorTemplate = {
      siteName: siteName,
      siteType: siteType,
      primaryHex: color1,
      secondaryHex: color2,
      tertiaryHex: color3,
      vertical: vertical,
      advancedFilter: advancedFilter,
      apiKey: apiKey,
      customFields: customFields,
    }

    try {
      setIsLoading(true)
      // Make a POST request to your API endpoint using fetch
      const response = await fetch('https://23gnboof89.execute-api.us-east-1.amazonaws.com/staging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatorTemplateData),
      });
      
      // TODO(tredshaw): update error response to be json
      const responseData: GeneratorResponse = await response.json();
      console.log('Response:', responseData);
      setResponse(responseData)
    } catch (error :any) {
      //TODO(tredshaw): handle errors
      const errorResponse :GeneratorResponse = {
        message: "Error displaying request properly, check network tab..",
      }
      setResponse(errorResponse)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2">
        <form onSubmit={handleSubmit} className=" p-4 bg-gray-100 shadow-md rounded w-full">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
          <Tooltip content="enter existing repo for updates" placement="top-start">
            <div className="flex flex-row items-center">
              <span>Site Name</span>
              <FaInfoCircle className="ml-2" /> 
            </div>
          </Tooltip>
            <input
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Site Type
            <select
              value={siteType}
              onChange={(e) => setSiteType(e.target.value)}
              className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="single_location_template">Single Location Page</option>
              <option value="enterprise_locations_template">Enterprise</option>
            </select>
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Primary Hexcode
            <input
              type="text"
              value={color1}
              onChange={(e) => setColor1(e.target.value)}
              className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Secondary Hexcode
            <input
              type="text"
              value={color2}
              onChange={(e) => setColor2(e.target.value)}
              className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </label>

          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Tertiary Hexcode
            <input
              type="text"
              value={color3}
              onChange={(e) => setColor3(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Advanced Filter
            <input
              type="text"
              value={advancedFilter}
              onChange={(e) => setAdvancedFilter(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Industry
            <select
              value={vertical}
              onChange={(e) => setVertical(e.target.value)}
              className="font-normal block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="qsr">Quick Service Restaurant</option>
              <option value="financial_services">Financial Services</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            <Tooltip content="comma separated list: c_header, c_promo1, etc.." placement="top-start">
              <div className="flex flex-row items-center">
                <span>Custom Fields</span>
                <FaInfoCircle className="ml-2" /> 
              </div>
            </Tooltip>
            <input
              type="text"
              value={customFields}
              onChange={(e) => setCustomFields(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
            />
          </label>
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Private Alpha API Key
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="block w-full mt-1 p-2 border rounded-md focus:outline-none focus:border-blue-500 font-normal"
            />
          </label>
          <button
            type="submit"
            className="mt-4 p-2 bg-brand-tertiary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Generate Pages Repo
          </button>
        </form>
      </div>
      <div className="md:w-1/2 md:px-4">
        {isLoading && (
          <div className="flex flex-col w-full items-center justify-center">
            <span>
              Generating Pages Repo...
            </span>
            <img src={spinner} className="md:w-1/2" />
          </div>
        )}
        {!isLoading && response && (
          <div className="">
            <div className="flex flex-col">
              <h6 className="Heading--sub my-4 md:mt-0">
                Generator Response
              </h6>
              {response.repoUrl && (
                <a className="Button--green mb-8 text-center rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600" href={response.repoUrl} target="_blank">View on Github</a>
              )}
              <JsonView data={response} shouldExpandNode={allExpanded} style={defaultStyles} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio;
