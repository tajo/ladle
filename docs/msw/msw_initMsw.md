# msw.initMsw

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\msw.tsx` (lines 13-33)
- **Role:** internal
- **Stability:** unknown

## Signature

```
async () => {
      if (msw.length > 0) {
        const { setupWorker } = await import("msw/browser");
        if (!window.__ladle_msw) {
          window.__ladle_msw = setupWorker();
          window.__ladle_msw.use(...msw);
          window.__ladle_msw
            .start({
              serviceWorker: {
                url: `${(import.meta as any).env.BASE_URL}mockServiceWorker.js`,
              },
            })
            .then(() => {
              setReady(true);
            });
        } else {
          window.__ladle_msw.use(...msw);
          setReady(true);
        }
      }
    }
```

## Docstring

_No docstring provided._

## Source

```
    const initMsw = async () => {
      if (msw.length > 0) {
        const { setupWorker } = await import("msw/browser");
        if (!window.__ladle_msw) {
          window.__ladle_msw = setupWorker();
          window.__ladle_msw.use(...msw);
          window.__ladle_msw
            .start({
              serviceWorker: {
                url: `${(import.meta as any).env.BASE_URL}mockServiceWorker.js`,
              },
            })
            .then(() => {
              setReady(true);
            });
        } else {
          window.__ladle_msw.use(...msw);
          setReady(true);
        }
      }
    };
```

## Git History

- Commits: 3
- Authors: 1
- Bug fixes: 1
- Features: 1

## Callers

None

## Callees

None
