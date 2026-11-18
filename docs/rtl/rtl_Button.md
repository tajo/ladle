# rtl.Button

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\rtl.tsx` (lines 14-43)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ dispatch, globalState }: AddonProps) => {
  const rtlText = "Switch text direction to right to left.";
  const ltrText = "Switch text direction to left to right.";
  useHotkeys(
    config.hotkeys.rtl,
    () => dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl }),
    {
      enabled: globalState.hotkeys && config.addons.rtl.enabled,
    },
  );
  return (
    <li>
      <button
        aria-label={globalState.rtl ? ltrText : rtlText}
        title={globalState.rtl ? ltrText : rtlText}
        className={globalState.rtl ? "ladle-active" : ""}
        onClick={() =>
          dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl })
        }
        type="button"
      >
        <Rtl />
        <span className="ladle-addon-tooltip">
          {globalState.rtl ? ltrText : rtlText}
        </span>
        <label>Right to left</label>
      </button>
    </li>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Button = ({ dispatch, globalState }: AddonProps) => {
  const rtlText = "Switch text direction to right to left.";
  const ltrText = "Switch text direction to left to right.";
  useHotkeys(
    config.hotkeys.rtl,
    () => dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl }),
    {
      enabled: globalState.hotkeys && config.addons.rtl.enabled,
    },
  );
  return (
    <li>
      <button
        aria-label={globalState.rtl ? ltrText : rtlText}
        title={globalState.rtl ? ltrText : rtlText}
        className={globalState.rtl ? "ladle-active" : ""}
        onClick={() =>
          dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl })
        }
        type="button"
      >
        <Rtl />
        <span className="ladle-addon-tooltip">
          {globalState.rtl ? ltrText : rtlText}
        </span>
        <label>Right to left</label>
      </button>
    </li>
  );
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
