import React from "react";

export const LeftIcon = ({ ...props }) => {
  return (
    <svg width="100" height="20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="5" />
      <line
        x1="20"
        y1="10"
        x2="80"
        y2="10"
        strokeWidth="2.5"
        strokeDasharray="5,5"
      />
      <line
        x1="80"
        y1="10"
        x2="90"
        y2="10"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
    </svg>
  );
};

export const RightIcon = ({ ...props }) => {
  return (
    <svg width="150" height="40" xmlns="http://www.w3.org/2000/svg" {...props}>
      <line
        x1="20"
        y1="20"
        x2="10"
        y2="20"
        strokeWidth="2"
        strokeDasharray="3,3"
      />
      <line
        x1="25"
        y1="20"
        x2="70"
        y2="20"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
      <path d="M75,15 L85,20 L75,25 L77,20 L75,15 Z" />
    </svg>
  );
};