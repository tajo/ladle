# vite-my-plugin.myPlugin

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\config-ts\vite-my-plugin.ts` (lines 1-16)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function myPlugin() {
  return {
    name: "vite-my-plugin",

    config() {
      return {
        define: {
          // @ts-ignore
          __filename_myPlugin: JSON.stringify(__filename),
          // @ts-ignore
          __dirname_myPlugin: JSON.stringify(__dirname),
        },
      };
    },
  };
}
```

## Docstring

_No docstring provided._

## Source

```
export default function myPlugin() {
  return {
    name: "vite-my-plugin",

    config() {
      return {
        define: {
          // @ts-ignore
          __filename_myPlugin: JSON.stringify(__filename),
          // @ts-ignore
          __dirname_myPlugin: JSON.stringify(__dirname),
        },
      };
    },
  };
}
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
