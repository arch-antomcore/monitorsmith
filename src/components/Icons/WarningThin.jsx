import * as React from "react";
const SvgWarningThin = (props) => (
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
      strokeWidth={8}
      d="m142.41 40.22 87.46 151.87c6.13 10.7-1.79 23.91-14.41 23.91H40.54c-12.62 0-20.54-13.21-14.41-23.91l87.46-151.87c6.3-10.96 22.52-10.96 28.82 0M128 144v-40"
    />
    <circle cx={128} cy={180} r={8} />
  </svg>
);
export default SvgWarningThin;
