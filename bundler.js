const fg = require("fast-glob");
const path = require("path");
const getPort = require("get-port");
const defaultConfigContents = require("@parcel/config-default");
const Parcel = require("@parcel/core").default;
const ThrowableDiagnostic = require("@parcel/diagnostic");
const { prettyDiagnostic, openInBrowser } = require("@parcel/utils");
const { INTERNAL_ORIGINAL_CONSOLE } = require("@parcel/logger");

// const code = `import React from "react";

// const StoryA = () => {
//   return <h1>This is going to be really fast! Ok my dear. Wow. Ok thiasdl.</h1>;
// };

// export default StoryA;
// `;

require("v8-compile-cache");

async function logUncaughtError(e) {
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

const DIST_DIR = "/dist";

// https://github.com/parcel-bundler/parcel/issues/4530

const MODE = "development";
//const MODE = "production";

const fastbook = async ({ outputDir }) => {
  //const entries = await fg(["src/**/*.stories.js"]);
  //console.log(entries);

  port = await getPort();

  try {
    let bundler = new Parcel({
      entries: [path.join(__dirname, "app/index.html")],
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
      //includeNodeModules: true,
      isLibrary: false,
      minify: MODE === "development" ? false : true,
      mode: MODE,
      //disableCache: MODE === "development" ? false : true,
      outputFormat: "esmodule",
      patchConsole: false,
      hot:
        MODE === "development"
          ? {
              port: 1234,
            }
          : null,
      serve:
        MODE === "development"
          ? {
              port,
            }
          : false,
      sourceMaps: MODE === "development" ? true : false,
    });
    if (MODE === "development") {
      let { unsubscribe } = await bundler.watch((err) => {
        if (err) {
          throw err;
        }
      });

      await openInBrowser(`http://localhost:${port}`, "chrome");
    } else {
      await bundler.run();
    }
  } catch (e) {
    console.error(e);
  }
  //const options = bundler._getResolvedParcelOptions(); // hackety hack. Not a public API
  //console.log(options.defaultConfig.transformers);
};

module.exports = fastbook;
