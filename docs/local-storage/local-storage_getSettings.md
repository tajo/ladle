# local-storage.getSettings

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\local-storage.tsx` (lines 23-30)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(): Settings => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  return storageSettings as Settings;
}
```

## Docstring

_No docstring provided._

## Source

```
export const getSettings = (): Settings => {
  const storageValue = localStorage.getItem(storageKey);
  let storageSettings = defaultValue;
  try {
    if (storageValue) storageSettings = JSON.parse(storageValue);
  } catch (e) {}
  return storageSettings as Settings;
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
