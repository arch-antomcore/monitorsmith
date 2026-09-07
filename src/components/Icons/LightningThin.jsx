import * as React from "react";
const SvgLightningThin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={8}
      d="m160 16-16 80 64 24L96 240l16-80-64-24z"
    />
  </svg>
);
export default SvgLightningThin;
