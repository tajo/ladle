# mock-date.stories.Instanceof

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\decorators\src\mock-date.stories.tsx` (lines 35-47)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const mockDate = new Date();
  const realDate = new Date(1234);

  return (
    <dl>
      <dt>mockDate instanceof Date:</dt>
      <dd data-testid="mockDate">{mockDate instanceof Date ? "yes" : "no"}</dd>
      <dt>realDate instanceof Date:</dt>
      <dd data-testid="realDate">{realDate instanceof Date ? "yes" : "no"}</dd>
    </dl>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Instanceof: Story = () => {
  const mockDate = new Date();
  const realDate = new Date(1234);

  return (
    <dl>
      <dt>mockDate instanceof Date:</dt>
      <dd data-testid="mockDate">{mockDate instanceof Date ? "yes" : "no"}</dd>
      <dt>realDate instanceof Date:</dt>
      <dd data-testid="realDate">{realDate instanceof Date ? "yes" : "no"}</dd>
    </dl>
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
