# iframe-two.stories.AutoFocusInputAgain

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\iframe-two.stories.tsx` (lines 9-20)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
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
export const AutoFocusInputAgain = () => {
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

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
