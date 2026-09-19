import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import getPort from "get-port";
import { afterEach, expect, test } from "vitest";

const cliPath = fileURLToPath(new URL("../lib/cli/cli.js", import.meta.url));
const fixturePath = fileURLToPath(
  new URL("../../../e2e/config/", import.meta.url),
);
const processes = new Set<ReturnType<typeof spawn>>();
const temporaryDirectories = new Set<string>();

const waitFor = async (
  assertion: () => void | Promise<void>,
  timeout = 10_000,
) => {
  const startedAt = Date.now();
  let lastError;

  while (Date.now() - startedAt < timeout) {
    try {
      await assertion();
      return;
    } catch (error) {
      lastError = error;
      await delay(100);
    }
  }

  throw lastError;
};

const startLadle = async (command: "serve" | "dev", args: string[]) => {
  const temporaryDirectory = await mkdtemp(
    path.join(tmpdir(), "ladle-no-open-"),
  );
  temporaryDirectories.add(temporaryDirectory);
  const markerPath = path.join(temporaryDirectory, "browser-opened");
  const browserScriptPath = path.join(temporaryDirectory, "browser-spy.js");
  const viteConfigPath = path.join(temporaryDirectory, "vite.config.mjs");
  await writeFile(
    browserScriptPath,
    'require("node:fs").writeFileSync(process.env.LADLE_BROWSER_MARKER, "opened");',
  );
  await writeFile(
    viteConfigPath,
    'export default { server: { host: "127.0.0.1", open: true } };',
  );

  const port = await getPort();
  const child = spawn(
    process.execPath,
    [
      cliPath,
      command,
      "--port",
      String(port),
      "--viteConfig",
      viteConfigPath,
      ...args,
    ],
    {
      cwd: fixturePath,
      env: {
        ...process.env,
        BROWSER: browserScriptPath,
        LADLE_BROWSER_MARKER: markerPath,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  processes.add(child);

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });

  const url = `http://127.0.0.1:${port}/?story=hello--world`;
  await waitFor(async () => {
    if (child.exitCode !== null) {
      throw new Error(`Ladle exited before it was ready:\n${output}`);
    }
    const response = await fetch(url);
    expect(response.ok).toBe(true);
  });

  return { markerPath, url };
};

afterEach(async () => {
  for (const child of processes) {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      const exited = await Promise.race([
        new Promise<true>((resolve) => child.once("exit", () => resolve(true))),
        delay(5_000).then(() => false),
      ]);
      if (!exited && child.exitCode === null) {
        child.kill("SIGKILL");
      }
    }
  }
  processes.clear();

  for (const directory of temporaryDirectories) {
    await rm(directory, { recursive: true, force: true });
  }
  temporaryDirectories.clear();
});

test.each(["serve", "dev"] as const)(
  "%s --no-open starts without invoking the browser script",
  async (command) => {
    const { markerPath, url } = await startLadle(command, ["--no-open"]);

    const response = await fetch(url);
    expect(await response.text()).toContain("Ladle");
    await delay(500);
    expect(existsSync(markerPath)).toBe(false);
  },
  20_000,
);

test("serve invokes the browser script by default", async () => {
  const { markerPath } = await startLadle("serve", []);

  await waitFor(() => {
    expect(existsSync(markerPath)).toBe(true);
  });
}, 20_000);
