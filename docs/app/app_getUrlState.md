# app.getUrlState

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\app.tsx` (lines 39-53)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(
  search: string,
  globalState?: GlobalState,
): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search, config.defaultStory),
  rtl: getQueryRtl(search),
  source: getQuerySource(search),
  width: getQueryWidth(search),
  control: getQueryControl(search, globalState ? globalState.control : {}),
  action: [],
  controlInitialized: false,
  hotkeys: true,
})
```

## Docstring

_No docstring provided._

## Source

```
const getUrlState = (
  search: string,
  globalState?: GlobalState,
): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search, config.defaultStory),
  rtl: getQueryRtl(search),
  source: getQuerySource(search),
  width: getQueryWidth(search),
  control: getQueryControl(search, globalState ? globalState.control : {}),
  action: [],
  controlInitialized: false,
  hotkeys: true,
});
```

## Git History

- Commits: 14
- Authors: 3
- Bug fixes: 2
- Features: 8

## Callers

None

## Callees

None
