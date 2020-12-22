import { startDevServer, createConfiguration, SnowpackConfig } from "snowpack";
import getPort from "get-port";
import path from "path";
import { DevParamsT } from "./types";

const bundler = async (params: DevParamsT) => {
  const port = await getPort({
    port: [params.port, 61001, 62002, 62003, 62004, 62005],
  });
  try {
    const bundlerConfig = {
      mount: {
        "lib/app/public/": { url: "/", static: false },
        "lib/app/src": { url: "/temp" },
        "dist/app/src": { url: "/temp" },
        src: { url: "/temp" },
      },
      plugins: [
        path.join(__dirname, "./snowpack-plugin.js"),
        "@snowpack/plugin-react-refresh",
      ],
      devOptions: {
        port,
      },
    };
    const config = createConfiguration(bundlerConfig)[1] as SnowpackConfig;
    await startDevServer({ config, lockfile: null, cwd: process.cwd() });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
