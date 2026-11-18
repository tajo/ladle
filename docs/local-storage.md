# Module: local-storage

**File:** `\packages\ladle\lib\app\src\local-storage.tsx`

## Overview

Module `local-storage` contains 2 analyzed entities.

```
export type Settings = {
  appId?: string;
  sidebarWidth?: number;
};

// @ts-ignore
const APP_ID = import.meta.env.VITE_LADLE_APP_ID;
const storageKey = `ladle-settings-${APP_ID}`;
const defaultValue = { appId: APP_ID };

export const updateSettings = (settings: Settings) => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  localStorage.setItem(
    storageKey,
    JSON.stringify({ ...storageSettings, ...settings }),
  );
};

export const getSettings = (): Settings => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  return storageSettings as Settings;
};
```

## Key Components

| Entity | Type | Description |
|--------|------|-------------|
| `local-storage.updateSettings` | function | No description |
| `local-storage.getSettings` | function | No description |

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Note

Connect an NVIDIA Nemotron model (Ollama locally or Nebius Serverless) and re-run
`documentor generate` to upgrade these pages to AI-generated narrative docs with
purpose, usage examples, and gotchas.
