import * as React from "react";
const SvgXDuotone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect width={176} height={176} x={40} y={40} opacity={0.2} rx={16} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M200 56 56 200M200 200 56 56"
    />
  </svg>
);
export default SvgXDuotone;
