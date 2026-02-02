// @ts-nocheck
import http from "http";
import https from "https";
import { parse } from "url";
import fs from "fs";
import importFrom from "import-from";

const appRoot = process.cwd();
const Metro = importFrom(appRoot, "metro");
const MetroHmrServer =
  importFrom(appRoot, "metro/private/HmrServer").default ||
  importFrom(appRoot, "metro/private/HmrServer");
const createWebsocketServer =
  importFrom(appRoot, "metro/private/lib/createWebsocketServer").default ||
  importFrom(appRoot, "metro/private/lib/createWebsocketServer");
const connect = importFrom(process.cwd(), "connect");

// Fork of Metro's runServer function. Exports hmrServer and metroServer alongside the httpServer;
export const runServer = async (
  config,
  {
    hasReducedPerformance = false,
    host,
    onError,
    onReady,
    secureServerOptions,
    secure, //deprecated
    secureCert, // deprecated
    secureKey, // deprecated
    unstable_extraMiddleware,
    waitForBundler = false,
    websocketEndpoints = {},
    watch,
    // Our patch
    metroServerOnly,
  },
) => {
  // await earlyPortCheck(host, config.server.port);

  // if (secure != null || secureCert != null || secureKey != null) {
  //   // eslint-disable-next-line no-console
  //   console.warn(
  //     chalk.inverse.yellow.bold(' DEPRECATED '),
  //     'The `secure`, `secureCert`, and `secureKey` options are now deprecated. ' +
  //       'Please use the `secureServerOptions` object instead to pass options to ' +
  //       "Metro's https development server.",
  //   );
  // }

  const serverApp = connect();

  const { middleware, end, metroServer } = await Metro.createConnectMiddleware(
    config,
    {
      hasReducedPerformance,
      waitForBundler,
      watch,
    },
  );

  for (const handler of unstable_extraMiddleware ?? []) {
    serverApp.use(handler);
  }

  serverApp.use(middleware);

  let httpServer;

  if (secure || secureServerOptions != null) {
    let options = secureServerOptions;
    if (typeof secureKey === "string" && typeof secureCert === "string") {
      options = {
        key: fs.readFileSync(secureKey),
        cert: fs.readFileSync(secureCert),
        ...secureServerOptions,
      };
    }
    httpServer = https.createServer(options, serverApp);
  } else {
    httpServer = http.createServer(serverApp);
  }

  // Our patch for "build" process
  if (metroServerOnly) {
    return Promise.resolve({ metroServer });
  }

  return new Promise((resolve, reject) => {
    httpServer.on("error", (error) => {
      if (onError) {
        onError(error);
      }
      reject(error);
      end();
    });

    httpServer.listen(config.server.port, host, () => {
      const { address, port, family } = httpServer.address();
      config.reporter.update({
        type: "server_listening",
        address,
        port, // Assigned port if configured with port 0
        family,
      });

      if (onReady) {
        onReady(httpServer);
      }

      const hmrServer = new MetroHmrServer(
        metroServer.getBundler(),
        metroServer.getCreateModuleId(),
        config,
      );

      websocketEndpoints = {
        ...websocketEndpoints,
        "/hot": createWebsocketServer({
          websocketServer: hmrServer,
        }),
      };

      httpServer.on("upgrade", (request, socket, head) => {
        const { pathname } = parse(request.url);
        if (pathname != null && websocketEndpoints[pathname]) {
          websocketEndpoints[pathname].handleUpgrade(
            request,
            socket,
            head,
            (ws) => {
              websocketEndpoints[pathname].emit("connection", ws, request);
            },
          );
        } else {
          socket.destroy();
        }
      });

      resolve({ httpServer, hmrServer, metroServer });
    });

    // Disable any kind of automatic timeout behavior for incoming
    // requests in case it takes the packager more than the default
    // timeout of 120 seconds to respond to a request.
    httpServer.timeout = 0;

    httpServer.on("close", () => {
      end();
    });
  });
};
