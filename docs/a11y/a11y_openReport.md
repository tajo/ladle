# a11y.openReport

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\a11y.tsx` (lines 122-127)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
    runAxe(setViolations, setReportFinished, null).catch(console.error);
    // We give 100ms for axe to finish before displaying "Loading..."
    // inside of the dialog. Makes the UI transition to less jarring.
    setTimeout(() => setShowReport(!showReport), 100);
  }
```

## Docstring

_No docstring provided._

## Source

```
  const openReport = () => {
    runAxe(setViolations, setReportFinished, null).catch(console.error);
    // We give 100ms for axe to finish before displaying "Loading..."
    // inside of the dialog. Makes the UI transition to less jarring.
    setTimeout(() => setShowReport(!showReport), 100);
  };
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 0
- Features: 2

## Callers

None

## Callees

None
