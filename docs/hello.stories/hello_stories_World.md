# hello.stories.World

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\hello.stories.tsx` (lines 5-16)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const link = useLink();
  return (
    <>
      <Context />
      <h1>Hello World</h1>
      <button id="btn" onClick={() => link("hello--linked")}>
        Go to Linked Story
      </button>
    </>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const World: Story = () => {
  const link = useLink();
  return (
    <>
      <Context />
      <h1>Hello World</h1>
      <button id="btn" onClick={() => link("hello--linked")}>
        Go to Linked Story
      </button>
    </>
  );
};
```

## Git History

- Commits: 3
- Authors: 2
- Bug fixes: 1
- Features: 1

## Callers

None

## Callees

None
