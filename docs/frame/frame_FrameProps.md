# frame.FrameProps

- **Type:** interface
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\iframe\frame.tsx` (lines 6-19)
- **Role:** protocol
- **Stability:** unknown

## Signature

```
interface FrameProps {
  style?: React.CSSProperties;
  head?: ReactNode;
  title: string;
  className: string;
  initialContent?: string;
  mountTarget?: string;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
  children?: ReactNode | ReactNode[];
  forwardedRef?:
    | ((instance: HTMLIFrameElement | null) => void)
    | React.RefObject<HTMLIFrameElement>;
}
```

## Docstring

_No docstring provided._

## Source

```
interface FrameProps {
  style?: React.CSSProperties;
  head?: ReactNode;
  title: string;
  className: string;
  initialContent?: string;
  mountTarget?: string;
  contentDidMount?: () => void;
  contentDidUpdate?: () => void;
  children?: ReactNode | ReactNode[];
  forwardedRef?:
    | ((instance: HTMLIFrameElement | null) => void)
    | React.RefObject<HTMLIFrameElement>;
}
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
