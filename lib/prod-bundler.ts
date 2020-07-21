import path from "path";
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
  try {
    let bundler = new Parcel({
      entries: [path.join(cachePath, "index.html")],
      targets: {
        app: {
          distDir: outputDir,
        },
      },
      defaultConfig: {
        ...defaultConfigContents,
        filePath: require.resolve("@parcel/config-default"),
      },
      defaultEngines: {
        browsers: ["last 1 Chrome version"],
      },
      mode: "production",
      publicUrl: ".",
      cacheDir: path.join(process.cwd(), ".fastbook/parcel"),
      sourceMaps: false,
      minify: true,
      env: { NODE_ENV: "production" },
    });
    await bundler.run();
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
