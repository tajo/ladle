import path from "path";

export const appPath = process.cwd();
export const cachePath = path.join(process.cwd(), ".fastbook/app");
export const relAppPath = path.relative(cachePath, appPath);
export const storyGlob = "src/**/*.stories.{js,jsx,ts,tsx}";
