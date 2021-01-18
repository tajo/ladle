#!/usr/bin/env node

import snowpackDev from "./snowpack-dev.js";

/**
 * @param params {import("./types").DevParamsT}
 */
const serve = async (params) => {
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = params.theme;
  await snowpackDev(params);
};

export default serve;
