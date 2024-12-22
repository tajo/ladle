import { copyFile, access, mkdir } from "fs/promises";
import { join } from "path";
// @ts-ignore
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/**
 *
 * @param {string} path
 */
async function ensureDirectoryExists(path) {
  try {
    await access(path);
  } catch {
    try {
      await mkdir(path);
    } catch (err) {
      console.error("Error:", err);
    }
  }
}

/**
 *
 * @param {string} publicDir
 */
const copyMswWorker = async (publicDir) => {
  await ensureDirectoryExists(publicDir);
  const mswWorkerPath = join(publicDir, "mockServiceWorker.js");
  const mswPath = require.resolve("msw");
  await copyFile(join(mswPath, "../../mockServiceWorker.js"), mswWorkerPath);
};

export default copyMswWorker;
