export default function myPlugin() {
  return {
    name: "vite-my-plugin",

    config() {
      return {
        define: {
          // @ts-ignore
          __filename_myPlugin: JSON.stringify(__filename),
          // @ts-ignore
          __dirname_myPlugin: JSON.stringify(__dirname),
        },
      };
    },
  };
}
