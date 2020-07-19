import path from "path";
import getPort from "get-port";
//@ts-ignore
import defaultConfigContents from "@parcel/config-default";
//@ts-ignore
import Parcel from "@parcel/core";
//@ts-ignore
import ThrowableDiagnostic from "@parcel/diagnostic";
//@ts-ignore
import { prettyDiagnostic, openInBrowser } from "@parcel/utils";
//@ts-ignore
import { INTERNAL_ORIGINAL_CONSOLE } from "@parcel/logger";
import { cachePath } from "./const";

require("v8-compile-cache");

async function logUncaughtError(e: any) {
  if (e instanceof ThrowableDiagnostic) {
    for (let diagnostic of e.diagnostics) {
      let out = await prettyDiagnostic(diagnostic);
      INTERNAL_ORIGINAL_CONSOLE.error(out.message);
      INTERNAL_ORIGINAL_CONSOLE.error(out.codeframe || out.stack);
      for (let h of out.hints) {
        INTERNAL_ORIGINAL_CONSOLE.error(h);
      }
    }
  } else {
    INTERNAL_ORIGINAL_CONSOLE.error(e);
  }

  // A hack to definitely ensure we logged the uncaught exception
  await new Promise((resolve) => setTimeout(resolve, 100));
}

process.on("unhandledRejection", async (reason) => {
  await logUncaughtError(reason);
  process.exit();
});

const bundler = async ({ outputDir }: { outputDir: string }) => {
  const port = await getPort();
  try {
    let bundler = new Parcel({
      entries: [path.join(cachePath, "index.html")],
      distDir: outputDir,
      // targets: {
      //   app: {
      //     distDir: outputDir,
      //   },
      // },
      defaultConfig: {
        ...defaultConfigContents,
        filePath: require.resolve("@parcel/config-default"),
      },
      defaultEngines: {
        browsers: ["last 1 Chrome version"],
      },
      mode: "development",
      outputFormat: "esmodule",
      cacheDir: path.join(process.cwd(), ".fastbook/parcel"),
      hot: {
        port: 1234,
      },
      serve: {
        port,
      },
      sourceMaps: true,
    });
    await bundler.watch((err: Error) => {
      if (err) {
        throw err;
      }
    });
    await openInBrowser(`http://localhost:${port}`, "chrome");
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
