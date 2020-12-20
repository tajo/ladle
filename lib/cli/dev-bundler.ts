import { startDevServer, createConfiguration, SnowpackConfig } from "snowpack";
import path from "path";

const bundler = async () => {
  // const servePort = await getPort({
  //   port: [params.port, 61001, 62002, 62003, 62004, 62005],
  // });
  // const hotPort = await getPort({
  //   port: [params.hotPort, 1235, 1236, 1237, 1238, 1239],
  // });
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
    };
    const config = createConfiguration(bundlerConfig)[1] as SnowpackConfig;
    await startDevServer({ config, lockfile: null, cwd: process.cwd() });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
