import { flowPlugin, esbuildFlowPlugin } from "./strip-flow.mjs";

export default {
  plugins: [flowPlugin()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  server: {
    open: "none",
    host: "127.0.0.1",
  },
  esbuild: {
    include: /\.(tsx?|jsx?)$/,
    exclude: [],
    loader: "tsx",
  },
};
