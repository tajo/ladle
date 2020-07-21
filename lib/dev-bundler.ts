import path from "path";
import getPort from "get-port";
//@ts-ignore
import defaultConfigContents from "@parcel/config-default";
//@ts-ignore
import Parcel from "@parcel/core";
//@ts-ignore
import { openInBrowser } from "@parcel/utils";
import { cachePath } from "./const";

require("v8-compile-cache");
require("./bundler-exception");

const bundler = async ({ outputDir }: { outputDir: string }) => {
  const port = await getPort();
  try {
    let bundler = new Parcel({
      entries: [path.join(cachePath, "index.html")],
      distDir: outputDir,
      defaultConfig: {
        ...defaultConfigContents,
        filePath: require.resolve("@parcel/config-default"),
      },
      defaultEngines: {
        browsers: ["last 1 Chrome version"],
      },
      mode: "development",
      cacheDir: path.join(process.cwd(), ".fastbook/parcel"),
      hot: {
        port: 1234,
      },
      serve: {
        port,
      },
      sourceMaps: true,
      patchConsole: true,
      env: { NODE_ENV: "development" },
    });
    const { unsubscribe } = await bundler.watch((err: Error) => {
      if (err) {
        throw err;
      }
    });
    await openInBrowser(`http://localhost:${port}`, "chrome");
    let isExiting: boolean;
    const exit = async () => {
      if (isExiting) {
        return;
      }
      isExiting = true;
      await unsubscribe();
      process.exit();
    };

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
      require("readline").emitKeypressEvents(process.stdin);
      process.stdin.on("keypress", async (_, key) => {
        if (key.ctrl && key.name === "c") {
          await exit();
        }
      });
    }
    process.on("SIGINT", exit);
    process.on("SIGTERM", exit);
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
