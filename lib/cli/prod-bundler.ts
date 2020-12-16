import path from "path";
//@ts-ignore
import defaultConfigContents from "@parcel/config-default";
//@ts-ignore
import Parcel from "@parcel/core";
//@ts-ignore
import type { BuildParamsT } from "./types";

const bundler = async (params: BuildParamsT) => {
  const distDir = path.isAbsolute(params.outDir)
    ? params.outDir
    : path.join(process.cwd(), params.outDir);
  console.log(distDir);
  try {
    let bundler = new Parcel({
      entries: [path.join(params.cacheDir, "app/index.html")],
      targets: {
        app: {
          distDir,
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
      cacheDir: path.join(params.cacheDir, "parcel"),
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
