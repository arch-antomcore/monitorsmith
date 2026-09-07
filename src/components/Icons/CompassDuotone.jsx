import * as React from "react";
const SvgCompassDuotone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path
      d="M128 32a96 96 0 1 0 96 96 96 96 0 0 0-96-96m16 112-64 32 32-64 64-32Z"
      opacity={0.2}
    />
    <circle
      cx={128}
      cy={128}
      r={96}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="m176 80-64 32-32 64 64-32z"
    />
  </svg>
);
export default SvgCompassDuotone;
