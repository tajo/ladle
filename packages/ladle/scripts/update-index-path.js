import fs from "fs";

const indexPath = "./packages/ladle/typings-for-build/app/index.html";
const index = fs.readFileSync(indexPath, "utf8");

fs.writeFileSync(indexPath, index.replace("index.tsx", "index.js"));
