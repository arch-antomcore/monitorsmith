import * as React from "react";
const SvgHardDrivesDuotone = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width="1em"
    height="1em"
    {...props}
  >
    <path fill="none" d="M0 0h256v256H0z" />
    <rect width={176} height={64} x={40} y={144} opacity={0.2} rx={8} />
    <rect width={176} height={64} x={40} y={48} opacity={0.2} rx={8} />
    <rect
      width={176}
      height={64}
      x={40}
      y={144}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={16}
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
      strokeWidth={16}
      rx={8}
    />
    <circle cx={180} cy={80} r={12} />
    <circle cx={180} cy={176} r={12} />
  </svg>
);
export default SvgHardDrivesDuotone;
