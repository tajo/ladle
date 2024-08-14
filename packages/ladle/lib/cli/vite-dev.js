import { createServer, searchForWorkspaceRoot } from "vite";
import koa from "koa";
import http from "http";
import http2 from "http2";
import https from "https";
import c2k from "koa-connect";
import path from "path";
import getPort from "get-port";
import { globby } from "globby";
import boxen from "boxen";
import chokidar from "chokidar";
import openBrowser from "./open-browser.js";
import debug from "./debug.js";
import getBaseViteConfig from "./vite-base.js";
import { getMetaJsonObject } from "./vite-plugin/generate/get-meta-json.js";
import { getEntryData } from "./vite-plugin/parse/get-entry-data.js";

/**
 * @param config {import("../shared/types").Config}
 * @param configFolder {string}
 */
const bundler = async (config, configFolder) => {
  const app = new koa();
  const port = await getPort({
    port: [config.port, 61001, 62002, 62003, 62004, 62005],
  });
  const hmrPort = await getPort({
    port: [24678, 24679, 24680, 24681, 24682, 24683, 24684, 24685],
  });
  const hmr = {
    // needed for hmr to work over network aka WSL2
    host: config.hmrHost ?? "localhost",
    port: config.hmrPort ?? hmrPort,
  };
  debug(`Port set to: ${port}`);
  try {
    /**
     * @type {import('vite').InlineConfig}
     */
    const viteConfig = await getBaseViteConfig(config, configFolder, {
      mode: config.mode || "development",
      server: {
        host: config.host,
        port: config.port,
        hmr: config.noWatch ? false : hmr,
        middlewareMode: true,
        fs: {
          allow: [searchForWorkspaceRoot(process.cwd())],
        },
        // TODO: pass null instead once this diff is included in release
        // https://github.com/vitejs/vite/pull/14208
        // watch: config.noWatch ? null : undefined,
        watch: {
          ignored: config.noWatch ? "**" : undefined,
        },
      },
    });
    const vite = await createServer(viteConfig);
    const { moduleGraph, ws } = vite;
    const { base } = viteConfig;
    const redirectBase = base && base !== "/" && base !== "./" ? base : "";

    app.use(async (ctx, next) => {
      if (
        ctx.request.method === "GET" &&
        ctx.request.url ===
          (redirectBase ? path.join(redirectBase, "meta.json") : "/meta.json")
      ) {
        const entryData = await getEntryData(
          await globby(
            Array.isArray(config.stories) ? config.stories : [config.stories],
          ),
        );
        const jsonContent = getMetaJsonObject(entryData);
        ctx.body = jsonContent;
        return;
      }
      if (redirectBase && ctx.request.method === "GET") {
        if (ctx.request.url === "/" || ctx.request.url === "/index.html") {
          ctx.redirect(redirectBase);
          return;
        }
        if (ctx.request.url === "/meta.json") {
          ctx.redirect(path.join(redirectBase, "meta.json"));
          return;
        }
      }
      if (ctx.request.method === "HEAD") {
        ctx.status = 200;
        return;
      }
      await next();
    });
    app.use(c2k(vite.middlewares));

    // activate https if key and cert are provided
    const useHttps =
      typeof vite.config.server?.https === "object" &&
      vite.config.server.https.key &&
      vite.config.server.https.cert;
    const hostname =
      config.host ??
      (vite.config.server.host === true
        ? "0.0.0.0"
        : typeof vite.config.server.host === "string"
          ? vite.config.server.host
          : "localhost");
    const serverUrl = `${useHttps ? "https" : "http"}://${hostname}:${port}${
      vite.config.base || ""
    }`;

    const listenCallback = async () => {
      console.log(
        boxen(`🥄 Ladle.dev served at ${serverUrl}`, {
          padding: 1,
          margin: 1,
          borderStyle: "round",
          borderColor: "yellow",
          titleAlignment: "center",
          textAlignment: "center",
        }),
      );

      config.onDevServerStart(serverUrl);

      if (
        vite.config.server.open !== "none" &&
        vite.config.server.open !== false
      ) {
        openBrowser(serverUrl);
      }
    };

    if (useHttps) {
      const usesProxy = Boolean(vite.config.server.proxy);

      if (config.disableHttp2 || usesProxy) {
        https
          .createServer({ ...vite.config.server.https }, app.callback())
          .listen(port, hostname, listenCallback);
      } else {
        http2
          .createSecureServer(
            {
              // Support HMR WS connection
              allowHTTP1: true,
              maxSessionMemory: 100,
              settings: {
                // Note: Chromium-based browser will initially allow 100 concurrent streams to be open
                // over a single HTTP/2 connection, unless HTTP/2 server advertises a different value,
                // in which case it will be capped at maximum of 256 concurrent streams. Hence pushing
                // to the limit while in development, in an attempt to maximize the dev performance by
                // minimizing the chances of the module requests queuing/stalling on the client-side.
                // @see https://source.chromium.org/chromium/chromium/src/+/4c44ff10bcbdb2d113dcc43c72f3f47a84a8dd45:net/spdy/spdy_session.cc;l=477-479
                maxConcurrentStreams: 256,
              },
              // @ts-ignore
              ...vite.config.server.https,
            },
            app.callback(),
          )
          .listen(port, hostname, listenCallback);
      }
    } else {
      http.createServer(app.callback()).listen(port, hostname, listenCallback);
    }

    if (config.noWatch === false) {
      // trigger full reload when new stories are added or removed
      const watcher = chokidar.watch(config.stories, {
        persistent: true,
        ignoreInitial: true,
      });
      let checkSum = "";
      const getChecksum = async () => {
        try {
          const entryData = await getEntryData(
            await globby(
              Array.isArray(config.stories) ? config.stories : [config.stories],
            ),
          );
          const jsonContent = getMetaJsonObject(entryData);
          // loc changes should not grant a full reload
          Object.keys(jsonContent.stories).forEach((storyId) => {
            jsonContent.stories[storyId].locStart = 0;
            jsonContent.stories[storyId].locEnd = 0;
          });
          return JSON.stringify(jsonContent);
        } catch (e) {
          return checkSum;
        }
      };
      checkSum = await getChecksum();
      const invalidate = async () => {
        const newChecksum = await getChecksum();
        if (checkSum === newChecksum) return;
        checkSum = newChecksum;
        const module = moduleGraph.getModuleById("\0virtual:generated-list");
        if (module) {
          moduleGraph.invalidateModule(module);
          if (ws) {
            ws.send({
              type: "full-reload",
              path: "*",
            });
          }
        }
      };
      watcher
        .on("add", invalidate)
        .on("change", invalidate)
        .on("unlink", invalidate);
    }
  } catch (e) {
    console.log(e);
  }
};

export default bundler;
