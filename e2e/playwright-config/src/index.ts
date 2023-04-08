import type { PlaywrightTestConfig } from "@playwright/test";

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

export default getPlaywrightConfig;
