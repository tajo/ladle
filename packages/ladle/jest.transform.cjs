// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require("babel-jest").default.createTransformer({
  presets: ["@babel/preset-typescript"],
  //plugins: ["@babel/plugin-transform-modules-commonjs"],
});
