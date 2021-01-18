const path = require("path");

module.exports = {
  storyGlob: "src/**/*.stories.{js,jsx,ts,tsx}",
  appSrcDir: path.join(process.cwd(), "dist/app/src"),
};
