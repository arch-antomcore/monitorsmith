import * as React from "react";
const SvgTerminalWindowLight = (props) => (
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
      strokeWidth={12}
      d="m80 96 40 32-40 32M136 160h40"
    />
    <rect
      width={192}
      height={160}
      x={32}
      y={48}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={12}
      rx={8}
    />
  </svg>
);
export default SvgTerminalWindowLight;
