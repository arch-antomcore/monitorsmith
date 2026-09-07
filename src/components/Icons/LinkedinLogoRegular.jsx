import * as React from "react";
const SvgLinkedinLogoRegular = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect
      width={192}
      height={192}
      x={32}
      y={32}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      rx={8}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M120 112v64M88 112v64M120 140a28 28 0 0 1 56 0v36"
    />
    <circle cx={88} cy={84} r={12} />
  </svg>
);
export default SvgLinkedinLogoRegular;
