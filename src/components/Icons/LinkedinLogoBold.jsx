import * as React from "react";
const SvgLinkedinLogoBold = (props) => (
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
      strokeWidth={24}
      rx={8}
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={24}
      d="M124 120v56M84 120v56M124 148a28 28 0 0 1 56 0v28"
    />
    <circle cx={84} cy={80} r={16} />
  </svg>
);
export default SvgLinkedinLogoBold;
