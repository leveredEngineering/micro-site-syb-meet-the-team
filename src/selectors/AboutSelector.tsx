// component that renders a specific about section based on value of a react select dropdown

import React, { useState } from "react";

import { AboutProps } from "src/types/About/About";

import About from "src/components/entity/About";
import About2 from "src/components/entity/About2";
import PlatformDebugModal from "src/components/leverageui/PlatformDebugModal";

const AboutSelector = (props: AboutProps) => {
    const [selectedAbout, setSelectedAbout] = useState("About");
    
    const aboutOptions = [
        { value: "About1", label: "About1" },
        { value: "About2", label: "About2" },
    ];
    
    const renderAbout = () => {
      switch (selectedAbout) {
        case "About1":
            return <About {...props} />;
        case "About2":
              return <About2 {...props} />;
        default:
            return <About {...props} />;
        }
    };
    
    return (
      <div className="AboutSelector">
        <div className="AboutSelector-select flex">
          <select
          className="AboutSelector-select border-4 border-brand-primary rounded-lg ml-8 mr-8 mb-8"
          onChange={(e) => setSelectedAbout(e.target.value)}
          >
          {aboutOptions.map((option) => (
              <option value={option.value}>{option.label}</option>
          ))}
          </select>
          <PlatformDebugModal {...props} sectionTitle="c_about" />
        </div>
        {renderAbout()}
      </div>
    );
    }

export default AboutSelector;