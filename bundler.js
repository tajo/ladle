const fg = require("fast-glob");
const path = require("path");
const getPort = require("get-port");
const defaultConfigContents = require("@parcel/config-default");
const Parcel = require("@parcel/core").default;

// https://github.com/parcel-bundler/parcel/issues/4530

const MODE = "development";
//const MODE = "production";

const fastbook = async ({ outputDir }) => {
  //const entries = await fg(["src/**/*.stories.js"]);
  //console.log(entries);

  port = await getPort();

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
      browsers: ["last 1 chrome"],
    },
    includeNodeModules: true,
    isLibrary: false,
    minify: MODE === "development" ? false : true,
    mode: MODE,
    disableCache: MODE === "development" ? false : true,
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
  } else {
    await bundler.run();
  }

  const options = bundler._getResolvedParcelOptions(); // hackety hack. Not a public API
  //console.log(options.defaultConfig.transformers);
};

module.exports = fastbook;
