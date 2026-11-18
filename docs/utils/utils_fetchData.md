# utils.fetchData

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\msw\src\utils.ts` (lines 1-9)
- **Role:** internal
- **Stability:** unknown

## Signature

```
async (url: string, setData: (data: any) => void) => {
  try {
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
  } catch (e) {
    console.error(e);
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export const fetchData = async (url: string, setData: (data: any) => void) => {
  try {
    const data = await fetch(url);
    const json = await data.json();
    setData(json);
  } catch (e) {
    console.error(e);
  }
};
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 0
- Features: 1

## Callers

None

## Callees

None
