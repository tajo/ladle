# iframe.stories.Page

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\iframe.stories.tsx` (lines 9-23)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => <div>Page</div>;
export const PageB = () => <div>Page B</div>;
export const PageC = () => <div>Page C</div>;
export const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
}
```

## Docstring

_No docstring provided._

## Source

```
export const Page = () => <div>Page</div>;
export const PageB = () => <div>Page B</div>;
export const PageC = () => <div>Page C</div>;
export const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
};
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
