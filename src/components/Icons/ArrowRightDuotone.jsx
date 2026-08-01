import * as React from "react";
const SvgArrowRightDuotone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <path d="m144 56 72 72-72 72z" opacity={0.2} />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
      d="M40 128h104M144 56l72 72-72 72z"
    />
  </svg>
);
export default SvgArrowRightDuotone;
