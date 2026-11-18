# action.stories.Basic

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\action.stories.tsx` (lines 6-17)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ onClick }) => {
  return (
    <>
      <button id="args-button" onClick={onClick}>
        Args
      </button>
      <button id="manual-button" onClick={action("second")}>
        Manual
      </button>
    </>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
}> = ({ onClick }) => {
  return (
    <>
      <button id="args-button" onClick={onClick}>
        Args
      </button>
      <button id="manual-button" onClick={action("second")}>
        Manual
      </button>
    </>
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
