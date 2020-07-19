const path = require("path");

const appPath = process.cwd();
const cachePath = path.join(process.cwd(), ".fastbook/app");
const relAppPath = path.relative(cachePath, appPath);
const storyGlob = "src/**/*.stories.{js,jsx,ts,tsx}";

module.exports = {
  appPath,
  cachePath,
  relAppPath,
  storyGlob,
};
