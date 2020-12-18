#!/usr/bin/env node

import devBundler from "./dev-bundler";

const serve = async () => {
  devBundler();
};

export default serve;
