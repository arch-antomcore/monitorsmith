import * as React from "react";
const SvgArrowLeftRegular = (props) => (
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
      d="M216 128H40M112 56l-72 72 72 72"
    />
  </svg>
);
export default SvgArrowLeftRegular;
