export default {
  server: {
    open: "none",
    host: "127.0.0.1",
  },
  resolve: {
    // See #184 - this tests the package for the resolve.alias RegExp format.
    alias: [{ find: /any-cool-regex/, replacement: "any-string" }],
  },
};
