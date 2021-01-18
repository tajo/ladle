#!/usr/bin/env node

import snowpackProd from "./snowpack-prod.js";

/**
 * @param params {import("./types").BuildParamsT}
 */
const build = async (params) => {
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = params.theme;
  await snowpackProd(params);
  process.exit(0);
};

export default build;
