# ui.Link

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\ui.tsx` (lines 50-64)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  children,
  href,
  style,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <a className="ladle-link" href={href} style={style}>
      {children}
    </a>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Link = ({
  children,
  href,
  style,
}: {
  href: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return (
    <a className="ladle-link" href={href} style={style}>
      {children}
    </a>
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
