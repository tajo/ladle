import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const getAppRoot = () => {
  if (
    fs.existsSync(
      path.join(__dirname, "../../typings-for-build/app/index.html"),
    )
  ) {
    // published/compiled folder of our app
    return path.join(__dirname, "../../typings-for-build/app");
  }
  return path.join(__dirname, "../app");
};

export default getAppRoot;
