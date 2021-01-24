import * as React from "react";

export const Preview: React.FC<{}> = () => {
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

export const Bulb: React.FC<{}> = () => {
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

export const Page: React.FC<{}> = () => {
  return (
    <div style={{ width: "10px", marginRight: "0.5em" }}>
      <svg fill="currentColor" viewBox="0 0 768 1024">
        <path d="M509 64l195 218v669q0 3-4 6t-9 3H77q-5 0-9-3t-4-6V73q0-3 4-6t9-3h432zm29-64H77Q45 0 22.5 21.5T0 73v878q0 30 22.5 51.5T77 1024h614q32 0 54.5-21.5T768 951V257zm-26 256V0h-64v256q0 26 19 45t45 19h253v-64H512z" />
      </svg>
    </div>
  );
};

export const Down: React.FC<{}> = () => {
  return (
    <div style={{ width: "10px", marginRight: "0.4em", marginTop: "-0.1em" }}>
      <svg fill="currentColor" viewBox="0 0 1024 574">
        <path d="M1015 10q-10-10-23-10t-23 10L512 492 55 10Q45 0 32 0T9 10Q0 20 0 34t9 24l480 506q10 10 23 10t23-10l480-506q9-10 9-24t-9-24z" />
      </svg>
    </div>
  );
};

export const Right: React.FC<{}> = () => {
  return (
    <div style={{ width: "6px", marginRight: "0.65em" }}>
      <svg fill="currentColor" viewBox="0 0 574 1024">
        <path d="M10 9Q0 19 0 32t10 23l482 457L10 969Q0 979 0 992t10 23q10 9 24 9t24-9l506-480q10-10 10-23t-10-23L58 9Q48 0 34 0T10 9z" />
      </svg>
    </div>
  );
};
