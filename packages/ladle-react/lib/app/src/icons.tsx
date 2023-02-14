import * as React from "react";

export const Close = () => {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
};

export const Ladle = () => {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth={0.5}
      stroke="currentColor"
      fill="currentColor"
      width={24}
      height={24}
    >
      <path d="M22 14H9V5a4 4 0 00-8 0v3a1 1 0 002 0V5a2 2 0 014 0v10a8 8 0 0016 0 1 1 0 00-1-1zm-7 7a6.01 6.01 0 01-5.917-5h11.834A6.01 6.01 0 0115 21z" />
    </svg>
  );
};

export const Rtl = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M16 4H9.5a3.5 3.5 0 000 7h.5M14 15V4M10 15V4M5 19h14M7 21l-2-2 2-2" />
    </svg>
  );
};

export const Ring = () => {
  React.useEffect(() => {
    document.documentElement.removeAttribute("data-storyloaded");
    return () => document.documentElement.setAttribute("data-storyloaded", "");
  }, []);
  return (
    <div className="ladle-ring-wrapper">
      <div className="ladle-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export const Preview = () => {
  const size = 24;
  const color = "currentColor";
  const stroke = 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M16 4h4v4M14 10l6-6M8 20H4v-4M4 20l6-6" />
    </svg>
  );
};

export const Bulb = () => {
  const size = 24;
  const color = "currentColor";
  const stroke = 2;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth={stroke}
      stroke={color}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" />
      <path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" />
      <line x1={9.7} y1={17} x2={14.3} y2={17} />
    </svg>
  );
};

export const Page = () => {
  return (
    <div
      style={{
        width: "10px",
        marginInlineEnd: "0.5em",
        flexShrink: 0,
      }}
    >
      <svg fill="currentColor" viewBox="0 0 768 1024">
        <path d="M509 64l195 218v669q0 3-4 6t-9 3H77q-5 0-9-3t-4-6V73q0-3 4-6t9-3h432zm29-64H77Q45 0 22.5 21.5T0 73v878q0 30 22.5 51.5T77 1024h614q32 0 54.5-21.5T768 951V257zm-26 256V0h-64v256q0 26 19 45t45 19h253v-64H512z" />
      </svg>
    </div>
  );
};

export const Down = ({ rotate }: { rotate?: boolean }) => {
  return (
    <div
      aria-hidden
      style={{
        width: "10px",
        marginInlineEnd: "0.4em",
        marginTop: "-0.1em",
        transform: rotate ? "rotate(-90deg)" : undefined,
      }}
    >
      <svg fill="currentColor" viewBox="0 0 1024 574">
        <path d="M1015 10q-10-10-23-10t-23 10L512 492 55 10Q45 0 32 0T9 10Q0 20 0 34t9 24l480 506q10 10 23 10t23-10l480-506q9-10 9-24t-9-24z" />
      </svg>
    </div>
  );
};

export const Right = () => {
  return (
    <div style={{ width: "6px", marginInlineEnd: "0.65em" }}>
      <svg fill="currentColor" viewBox="0 0 574 1024">
        <path d="M10 9Q0 19 0 32t10 23l482 457L10 969Q0 979 0 992t10 23q10 9 24 9t24-9l506-480q10-10 10-23t-10-23L58 9Q48 0 34 0T10 9z" />
      </svg>
    </div>
  );
};

export const Controls = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <circle cx={14} cy={6} r={2}></circle>
      <line x1={4} y1={6} x2={12} y2={6}></line>
      <line x1={16} y1={6} x2={20} y2={6}></line>
      <circle cx={8} cy={12} r={2}></circle>
      <line x1={4} y1={12} x2={6} y2={12}></line>
      <line x1={10} y1={12} x2={20} y2={12}></line>
      <circle cx={17} cy={18} r={2}></circle>
      <line x1={4} y1={18} x2={15} y2={18}></line>
      <line x1={19} y1={18} x2={20} y2={18}></line>
    </svg>
  );
};

export const Source = () => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="m7 8-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
    </svg>
  );
};

export const A11y = () => (
  <svg
    width={24}
    height={24}
    strokeWidth={2}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <circle cx={12} cy={12} r={9} />
    <path d="m10 16.5 2-3 2 3m-2-3v-2l3-1m-6 0 3 1" />
    <circle cx={12} cy={7.5} r={0.5} fill="currentColor" />
  </svg>
);

export const Width = () => (
  <svg
    width={24}
    height={24}
    strokeWidth={2}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <rect x={13} y={8} width={8} height={12} rx={1} />
    <path d="M18 8V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h9M16 9h2" />
  </svg>
);

export const Action = () => (
  <svg
    width={24}
    height={24}
    strokeWidth={2}
    viewBox="0 0 24 24"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M0 0h24v24H0z" stroke="none" />
    <path d="M18 8a3 3 0 0 1 0 6M10 8v11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-5" />
    <path d="M12 8h0l4.524-3.77A.9.9 0 0 1 18 4.922v12.156a.9.9 0 0 1-1.476.692L12 14H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h8" />
  </svg>
);
