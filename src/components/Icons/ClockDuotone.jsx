import * as React from "react";
const SvgClockDuotone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <circle cx={128} cy={128} r={96} opacity={0.2} />
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
      d="M128 72v56h56"
    />
  </svg>
);
export default SvgClockDuotone;
