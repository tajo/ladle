# error-boundary.ErrorBoundary

- **Type:** class
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\error-boundary.tsx` (lines 3-24)
- **Role:** internal
- **Stability:** unknown

## Signature

```
class ErrorBoundary extends React.Component<
  { children: React.ReactElement },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export default class ErrorBoundary extends React.Component<
  { children: React.ReactElement },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
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
