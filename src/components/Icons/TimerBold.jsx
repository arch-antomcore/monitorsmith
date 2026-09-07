import * as React from "react";
const SvgTimerBold = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <circle
      cx={128}
      cy={140}
      r={84}
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
      d="m128 136 28-28M104 16h48"
    />
  </svg>
);
export default SvgTimerBold;
