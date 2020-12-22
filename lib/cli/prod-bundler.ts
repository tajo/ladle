import { buildProject, createConfiguration, SnowpackConfig } from "snowpack";

const bundler = async () => {
  // const servePort = await getPort({
  //   port: [params.port, 61001, 62002, 62003, 62004, 62005],
  // });
  try {
    const bundlerConfig = {
      mount: {
        "lib/app/public/": { url: "/", static: false },
        "lib/app/src": { url: "/temp" },
        src: { url: "/temp" },
        ".ladle": { url: "/temp" },
      },
      buildOptions: {
        clean: true,
      },
      experiments: {
        optimize: {
          bundle: true,
          minify: true,
          target: "es2020" as any,
        },
      },
    };
    const config = createConfiguration(bundlerConfig)[1] as SnowpackConfig;
    await buildProject({ config, lockfile: null, cwd: process.cwd() });
  } catch (e) {
    console.error(e);
  }
};

export default bundler;
