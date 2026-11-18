# dialog.isAsyncMode

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 736-752)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console["warn"](
              "The ReactIs.isAsyncMode() alias has been deprecated, " +
                "and will be removed in React 17+. Update your code to use " +
                "ReactIs.isConcurrentMode() instead. It has the exact same API.",
            );
          }
        }

        return (
          isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE
        );
      }
```

## Docstring

_No docstring provided._

## Source

```
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console["warn"](
              "The ReactIs.isAsyncMode() alias has been deprecated, " +
                "and will be removed in React 17+. Update your code to use " +
                "ReactIs.isConcurrentMode() instead. It has the exact same API.",
            );
          }
        }

        return (
          isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE
        );
      }
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
