# local-storage.updateSettings

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\local-storage.tsx` (lines 11-21)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(settings: Settings) => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  localStorage.setItem(
    storageKey,
    JSON.stringify({ ...storageSettings, ...settings }),
  );
}
```

## Docstring

_No docstring provided._

## Source

```
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
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
