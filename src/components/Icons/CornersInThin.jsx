import * as React from "react";
const SvgCornersInThin = (props) => (
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
      d="M208 96h-48V48M48 160h48v48M160 208v-48h48M96 48v48H48"
    />
  </svg>
);
export default SvgCornersInThin;
