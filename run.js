#!/usr/bin/env node
const path = require("path");
const fastbook = require("./bundler");

(async () => {
  await fastbook({
    outputDir: path.join(process.cwd(), "dist"),
  });
})();
