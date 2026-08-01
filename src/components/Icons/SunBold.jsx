import * as React from "react";
const SvgSunBold = (props) => (
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
      d="M128 36V20"
    />
    <circle
      cx={128}
      cy={128}
      r={56}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
      d="M60 60 48 48M60 196l-12 12M196 60l12-12M196 196l12 12M36 128H20M128 220v16M220 128h16"
    />
  </svg>
);
export default SvgSunBold;
