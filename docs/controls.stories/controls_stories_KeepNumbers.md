# controls.stories.KeepNumbers

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\controls.stories.tsx` (lines 166-172)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ size }) => {
  return (
    <h1>
      {size} - {typeof size}
    </h1>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const KeepNumbers: Story<{ size: number }> = ({ size }) => {
  return (
    <h1>
      {size} - {typeof size}
    </h1>
  );
};
```

## Git History

- Commits: 12
- Authors: 4
- Bug fixes: 1
- Features: 6

## Callers

None

## Callees

None
