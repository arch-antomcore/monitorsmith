import * as React from "react";
const SvgCornersOutBold = (props) => (
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
      strokeWidth={24}
      d="M168 48h40v40M88 208H48v-40M208 168v40h-40M48 88V48h40"
    />
  </svg>
);
export default SvgCornersOutBold;
