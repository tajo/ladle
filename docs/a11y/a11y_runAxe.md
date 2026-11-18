# a11y.runAxe

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\a11y.tsx` (lines 19-33)
- **Role:** internal
- **Stability:** unknown

## Signature

```
async (
  setViolations: React.Dispatch<React.SetStateAction<ViolationsT>>,
  setReportFinished: React.Dispatch<React.SetStateAction<boolean>>,
  el: HTMLElement | null,
) => {
  const axe = await import("axe-core");
  try {
    const results = await axe.default.run(
      document.getElementsByTagName("main") as any,
    );
    setViolations(results.violations as ViolationsT);
    setReportFinished(true);
    if (el) el.setAttribute("aria-hidden", "true");
  } catch (e) {}
}
```

## Docstring

_No docstring provided._

## Source

```
const runAxe = async (
  setViolations: React.Dispatch<React.SetStateAction<ViolationsT>>,
  setReportFinished: React.Dispatch<React.SetStateAction<boolean>>,
  el: HTMLElement | null,
) => {
  const axe = await import("axe-core");
  try {
    const results = await axe.default.run(
      document.getElementsByTagName("main") as any,
    );
    setViolations(results.violations as ViolationsT);
    setReportFinished(true);
    if (el) el.setAttribute("aria-hidden", "true");
  } catch (e) {}
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
