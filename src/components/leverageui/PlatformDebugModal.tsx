import React, { useState } from "react";
import { FaTimes, FaCopy } from 'react-icons/fa';
import { JsonView, collapseAllNested, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import clipboardCopy from 'clipboard-copy';
// this is modal that will be used to debug data in a component
const PlatformDebugModal = (props: any) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
        // Move the body content to the right (200 pixels) when the drawer is opened
    if (!showModal) {
      window.scrollTo(0, 0);
    }
  };
  const copyToClipboard = () => {
    clipboardCopy(JSON.stringify(props.data, null, 2));
    // You can add some visual indication that the copy was successful if needed
  };
    return (
      <div className="debug flex items-center justify-center">
        <button onClick={toggleModal} className="Link Button bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-yellow active:bg-yellow-700">Log Props</button>
        <div className={`fixed inset-0 z-100 ${showModal ? "block" : "hidden"} overflow-auto bg-white flex flex-col`}>
          <button onClick={toggleModal} className="w-full bg-red-500 h-32 text-white text-2xl flex justify-center p-8 align-center">
            <FaTimes className="text-2xl" />
            <div className="ml-8">{props.sectionTitle}</div>
          </button>
          <button className="Link Button bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-yellow active:bg-yellow-700" onClick={copyToClipboard}>
            <span>Copy </span><FaCopy className="text-2xl" />
          </button>
          <JsonView data={props.data} shouldExpandNode={allExpanded} style={defaultStyles} />
        </div>
      </div>
    )
};

export default PlatformDebugModal;