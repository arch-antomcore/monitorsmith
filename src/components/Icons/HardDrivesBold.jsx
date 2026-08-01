import * as React from "react";
const SvgHardDrivesBold = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect
      width={176}
      height={160}
      x={40}
      y={48}
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
      d="M216 128H40"
    />
    <circle cx={176} cy={88} r={16} />
    <circle cx={176} cy={168} r={16} />
  </svg>
);
export default SvgHardDrivesBold;
