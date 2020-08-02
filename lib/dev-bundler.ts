import path from "path";
import getPort from "get-port";
//@ts-ignore
import defaultConfigContents from "@parcel/config-default";
//@ts-ignore
import Parcel from "@parcel/core";
//@ts-ignore
import { openInBrowser } from "@parcel/utils";
import type { ServeParamsT } from "./types";

const bundler = async (params: ServeParamsT) => {
  const servePort = await getPort({
    port: [params.port, 61001, 62002, 62003, 62004, 62005],
  });
  const hotPort = await getPort({
    port: [params.hotPort, 1235, 1236, 1237, 1238, 1239],
  });
  try {
    let bundler = new Parcel({
      entries: [path.join(params.cacheDir, "app/index.html")],
      distDir: path.join(params.cacheDir, "dist"),
      defaultConfig: {
        ...defaultConfigContents,
        filePath: require.resolve("@parcel/config-default"),
      },
      defaultEngines: {
        browsers: ["last 1 Chrome version"],
      },
      mode: "development",
      cacheDir: path.join(params.cacheDir, "parcel"),
      hot: {
        port: hotPort,
      },
      serve: {
        port: servePort,
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
    await openInBrowser(`http://localhost:${servePort}`);
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
