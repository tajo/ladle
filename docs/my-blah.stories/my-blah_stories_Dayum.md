# my-blah.stories.Dayum

- **Type:** function
- **Language:** typescript
- **File:** `\packages\example\src\my-blah.stories.tsx` (lines 45-56)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha tada</h1>
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
export const Dayum: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha tada</h1>
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
