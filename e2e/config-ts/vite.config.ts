import myPlugin from "./vite-my-plugin";

export default {
  server: {
    open: "none",
    host: "127.0.0.1",
  },

  define: {
    // @ts-ignore
    __filename_root: JSON.stringify(__filename),
    // @ts-ignore
    __dirname_root: JSON.stringify(__dirname),
  },
  plugins: [myPlugin()],
};
