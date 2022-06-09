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
  },
  esbuild: {
    include: /\.(tsx?|jsx?)$/,
    exclude: [],
    loader: "tsx",
  },
};
