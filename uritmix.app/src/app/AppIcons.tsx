import React from "react";
import * as Icon from "react-feather";

export namespace AppIcon {
  export const IconDictionary = () => {
    return <span className="material-icons">wysiwyg</span>;
  };

  export const IconAngleDown = () => {
    return <Icon.ChevronDown />;
  };

  export const IconCompany = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-life-buoy"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
        <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
        <line x1="14.83" y1="9.17" x2="19.07" y2="4.93" />
        <line x1="14.83" y1="9.17" x2="18.36" y2="5.64" />
        <line x1="4.93" y1="19.07" x2="9.17" y2="14.83" />
      </svg>
    );
  };

  export const IconProducts = () => {
    return <Icon.Box />;
  };

  export const IconClients = () => {
    return <Icon.Users />;
  };

  export const IconOrders = () => {
    return <Icon.ShoppingCart />;
  };

  export const IconScript = () => {
    return <Icon.Play />;
  };
}
