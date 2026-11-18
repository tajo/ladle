# my-story.stories.Ski

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\my-story.stories.tsx` (lines 16-26)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Yellowasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
}
```

## Docstring

_No docstring provided._

## Source

```
export const Ski: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Yellowasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
