#!/usr/bin/env node
import path from "path";
import bundler from "./dev-bundler";

(async () => {
  await bundler({
    outputDir: path.join(process.cwd(), "dist"),
  });
})();
