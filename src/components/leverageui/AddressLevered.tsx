import React from 'react';
import type {
  Address,
} from "@yext/types";
type AddressLeveredProps = {
  address: Address;
  customCssClasses?: string;
};
const AddressLevered = ({ address, customCssClasses }: AddressLeveredProps) => {
  
  return (
    <div className={`AddressLevered ${customCssClasses}`}>
      <div className="AddressLevered-address flex flex-col">
        <span className="AddressLevered-line1">{address.line1}</span>
        <span className="AddressLevered-line2">{address.line2}</span>
        <div>
          <span className="AddressLevered-city">{address.city}, </span>
          <span className="AddressLevered-region">{address.region}</span>
          <span className="AddressLevered-postalCode">{` ${address.postalCode}`}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressLevered;