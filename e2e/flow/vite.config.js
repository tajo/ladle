import { flowPlugin, esbuildFlowPlugin } from "./strip-flow";

export default {
  plugins: [flowPlugin()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildFlowPlugin()],
    },
  },
  esbuild: {
    include: /\.(tsx?|jsx?)$/,
    exclude: [],
    loader: "tsx",
  },
};
