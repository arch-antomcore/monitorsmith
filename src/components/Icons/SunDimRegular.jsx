import * as React from "react";
const SvgSunDimRegular = (props) => (
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
      strokeWidth={16}
      d="M128 40v-8"
    />
    <circle
      cx={128}
      cy={128}
      r={56}
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
      d="m64 64-8-8M64 192l-8 8M192 64l8-8M192 192l8 8M40 128h-8M128 216v8M216 128h8"
    />
  </svg>
);
export default SvgSunDimRegular;
