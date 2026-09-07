import * as React from "react";
const SvgMoonRegular = (props) => (
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
      strokeWidth={16}
      d="M108.11 28.11a96.09 96.09 0 0 0 119.78 119.78A96 96 0 1 1 108.11 28.11"
    />
  </svg>
);
export default SvgMoonRegular;
