export default {
  server: {
    open: "none",
  },
  resolve: {
    // See #184 - this tests the package for the resolve.alias RegExp format.
    alias: [{ find: /any-cool-regex/, replacement: "any-string" }],
  },
};
