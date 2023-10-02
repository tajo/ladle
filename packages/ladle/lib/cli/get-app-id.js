import fs from "fs";
import path from "path";
import crypto from "crypto";

const getAppId = () => {
  let pkgName = "unknown";
  try {
    const pkgJson = fs.readFileSync(
      path.join(process.cwd() + "/package.json"),
      "utf-8",
    );
    const parsedPkgJson = JSON.parse(pkgJson);
    pkgName = parsedPkgJson.name;
  } catch (e) {}
  const hash = crypto.createHash("sha256");
  hash.update(process.cwd() + "#" + pkgName);
  return hash.digest("hex").slice(0, 6);
};

export default getAppId;
