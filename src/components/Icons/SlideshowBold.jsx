import * as React from "react";
const SvgSlideshowBold = (props) => (
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
      height={144}
      x={64}
      y={56}
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
      d="M232 56v144M24 56v144"
    />
  </svg>
);
export default SvgSlideshowBold;
