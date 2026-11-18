# index.getCommand

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\playwright-config\src\index.ts` (lines 3-14)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(type?: string): string => {
  switch (type) {
    case "dev":
      return "pnpm serve";
    case "prod":
      return "pnpm serve-prod";
    case "update":
      return "pnpm build-preview";
    default:
      throw new Error(`Unknown type: ${type}`);
  }
}
```

## Docstring

_No docstring provided._

## Source

```
const getCommand = (type?: string): string => {
  switch (type) {
    case "dev":
      return "pnpm serve";
    case "prod":
      return "pnpm serve-prod";
    case "update":
      return "pnpm build-preview";
    default:
      throw new Error(`Unknown type: ${type}`);
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
