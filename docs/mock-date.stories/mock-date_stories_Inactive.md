# mock-date.stories.Inactive

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\decorators\src\mock-date.stories.tsx` (lines 21-33)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const date = new Date();
  return (
    <h1>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Inactive: Story = () => {
  const date = new Date();
  return (
    <h1>
      {date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </h1>
  );
};
```

## Git History

- Commits: 2
- Authors: 2
- Bug fixes: 2
- Features: 2

## Callers

None

## Callees

None
