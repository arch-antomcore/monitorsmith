import * as React from "react";
const SvgDeviceMobileBold = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect
      width={128}
      height={208}
      x={64}
      y={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
      rx={16}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
      d="M64 64h128M64 192h128"
    />
  </svg>
);
export default SvgDeviceMobileBold;
