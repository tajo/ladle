# index.getPlaywrightConfig

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\playwright-config\src\index.ts` (lines 16-36)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  port,
}: {
  port: number;
}): PlaywrightTestConfig => {
  return {
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,
    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,
    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,
    use: {
      baseURL: `http://127.0.0.1:${port}`,
    },
    webServer: {
      command: getCommand(process.env.TYPE),
      url: `http://127.0.0.1:${port}`,
    },
  };
}
```

## Docstring

_No docstring provided._

## Source

```
const getPlaywrightConfig = ({
  port,
}: {
  port: number;
}): PlaywrightTestConfig => {
  return {
    // Fail the build on CI if you accidentally left test.only in the source code.
    forbidOnly: !!process.env.CI,
    // Retry on CI only.
    retries: process.env.CI ? 2 : 0,
    // Opt out of parallel tests on CI.
    workers: process.env.CI ? 1 : undefined,
    use: {
      baseURL: `http://127.0.0.1:${port}`,
    },
    webServer: {
      command: getCommand(process.env.TYPE),
      url: `http://127.0.0.1:${port}`,
    },
  };
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
