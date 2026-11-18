# msw.Msw

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\msw.tsx` (lines 4-44)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  children,
  msw,
}: {
  children: React.ReactElement;
  msw: RequestHandler[];
}) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
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
    initMsw();
    return () => {
      if (window.__ladle_msw) {
        window.__ladle_msw.resetHandlers();
      }
    };
  }, [msw]);
  if (msw.length === 0) return children;
  if (!ready) return null;
  return children;
}
```

## Docstring

_No docstring provided._

## Source

```
const Msw = ({
  children,
  msw,
}: {
  children: React.ReactElement;
  msw: RequestHandler[];
}) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
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
    initMsw();
    return () => {
      if (window.__ladle_msw) {
        window.__ladle_msw.resetHandlers();
      }
    };
  }, [msw]);
  if (msw.length === 0) return children;
  if (!ready) return null;
  return children;
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
