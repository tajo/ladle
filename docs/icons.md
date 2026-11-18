# Module: icons

**File:** `\packages\ladle\lib\app\src\icons.tsx`

## Overview

Module `icons` contains 3 analyzed entities.

```
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

export const Bulb = (
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `icons.Close` | function | No description |
| `icons.Ladle` | function | No description |
| `icons.Rtl` | function | No description |

## Git History

- Commits: 4
- Authors: 2
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
