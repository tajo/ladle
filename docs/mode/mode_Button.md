# mode.Button

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\addons\mode.tsx` (lines 18-38)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ dispatch }: AddonProps) => {
  const text = `Open fullscreen mode. Can be toggled by pressing ${config.hotkeys.fullscreen.join(
    " or ",
  )}.`;
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() =>
          dispatch({ type: ActionType.UpdateMode, value: ModeState.Preview })
        }
        type="button"
      >
        <Preview />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Open fullscreen mode</label>
      </button>
    </li>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Button = ({ dispatch }: AddonProps) => {
  const text = `Open fullscreen mode. Can be toggled by pressing ${config.hotkeys.fullscreen.join(
    " or ",
  )}.`;
  return (
    <li>
      <button
        aria-label={text}
        title={text}
        onClick={() =>
          dispatch({ type: ActionType.UpdateMode, value: ModeState.Preview })
        }
        type="button"
      >
        <Preview />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Open fullscreen mode</label>
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
