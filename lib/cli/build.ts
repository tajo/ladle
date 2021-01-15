#!/usr/bin/env node

import snowpackProd from "./snowpack-prod";
import type { BuildParamsT } from "./types";

const build = async (params: BuildParamsT) => {
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = params.theme;
  await snowpackProd(params);
  process.exit(0);
};

export default build;
