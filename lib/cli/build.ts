#!/usr/bin/env node

import prodBundler from "./prod-bundler";

const build = async () => {
  await prodBundler();
  process.exit(0);
};

export default build;
