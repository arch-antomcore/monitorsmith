import * as React from "react";
const SvgHardDrivesLight = (props) => (
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
      height={64}
      x={40}
      y={144}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      rx={8}
    />
    <rect
      width={176}
      height={64}
      x={40}
      y={48}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      rx={8}
    />
    <circle cx={180} cy={80} r={10} />
    <circle cx={180} cy={176} r={10} />
  </svg>
);
export default SvgHardDrivesLight;
