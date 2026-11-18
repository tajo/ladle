# components.Provider

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\baseweb\.ladle\components.tsx` (lines 8-19)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({ children, globalState }) => (
  <StyletronProvider value={engine}>
    <BaseProvider
      theme={{
        ...(globalState.theme === "dark" ? DarkTheme : LightTheme),
        direction: globalState.rtl ? "rtl" : "ltr",
      }}
    >
      {children}
    </BaseProvider>
  </StyletronProvider>
)
```

## Docstring

_No docstring provided._

## Source

```
export const Provider: GlobalProvider = ({ children, globalState }) => (
  <StyletronProvider value={engine}>
    <BaseProvider
      theme={{
        ...(globalState.theme === "dark" ? DarkTheme : LightTheme),
        direction: globalState.rtl ? "rtl" : "ltr",
      }}
    >
      {children}
    </BaseProvider>
  </StyletronProvider>
);
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
