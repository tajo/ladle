# ui.Button

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\ui.tsx` (lines 26-48)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  children,
  onClick,
  style,
  ...rest
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) => {
  return (
    <button
      className="ladle-button"
      onClick={onClick}
      style={style}
      aria-label={rest["aria-label"]}
      type="button"
    >
      {children}
    </button>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Button = ({
  children,
  onClick,
  style,
  ...rest
}: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  "aria-label"?: string;
}) => {
  return (
    <button
      className="ladle-button"
      onClick={onClick}
      style={style}
      aria-label={rest["aria-label"]}
      type="button"
    >
      {children}
    </button>
  );
};
```

## Git History

- Commits: 5
- Authors: 4
- Bug fixes: 3
- Features: 2

## Callers

None

## Callees

None
