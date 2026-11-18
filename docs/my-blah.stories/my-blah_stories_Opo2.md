# my-blah.stories.Opo2

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\my-blah.stories.tsx` (lines 32-43)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>coze opo Middle Muhaha tadaokok opsops</h1>
      <input />
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
export const Opo2: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>coze opo Middle Muhaha tadaokok opsops</h1>
      <input />
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
