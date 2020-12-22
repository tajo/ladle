#!/usr/bin/env node

import snowpackProd from "./snowpack-prod";
import type { BuildParamsT } from "./types";

const build = async (params: BuildParamsT) => {
  await snowpackProd(params);
  process.exit(0);
};

export default build;
