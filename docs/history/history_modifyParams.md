# history.modifyParams

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\history.ts` (lines 28-52)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(globalState: GlobalState) => {
  if (!globalState.controlInitialized) return;
  const queryParams = queryString.parse(location.search);
  const userQueryParams: { [key: string]: string } = {};
  Object.keys(queryParams).forEach((key) => {
    if (!key.startsWith("arg-")) {
      userQueryParams[key] = queryParams[key] as string;
    }
  });
  const params = {
    ...userQueryParams,
    mode: globalState.mode,
    rtl: globalState.rtl,
    source: globalState.source,
    story: globalState.story,
    theme: globalState.theme,
    width: globalState.width,
    control: globalState.control,
  };
  removeDefaultValues(params);
  if (location.search !== getHref(params)) {
    debug(`Updating URL to ${getHref(params)}`);
    history.push(getHref(params));
  }
}
```

## Docstring

_No docstring provided._

## Source

```
export const modifyParams = (globalState: GlobalState) => {
  if (!globalState.controlInitialized) return;
  const queryParams = queryString.parse(location.search);
  const userQueryParams: { [key: string]: string } = {};
  Object.keys(queryParams).forEach((key) => {
    if (!key.startsWith("arg-")) {
      userQueryParams[key] = queryParams[key] as string;
    }
  });
  const params = {
    ...userQueryParams,
    mode: globalState.mode,
    rtl: globalState.rtl,
    source: globalState.source,
    story: globalState.story,
    theme: globalState.theme,
    width: globalState.width,
    control: globalState.control,
  };
  removeDefaultValues(params);
  if (location.search !== getHref(params)) {
    debug(`Updating URL to ${getHref(params)}`);
    history.push(getHref(params));
  }
};
```

## Git History

- Commits: 9
- Authors: 2
- Bug fixes: 1
- Features: 3

## Callers

None

## Callees

None
