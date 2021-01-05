#!/usr/bin/env node

import snowpackDev from "./snowpack-dev";
import type { DevParamsT } from "./types";

const serve = async (params: DevParamsT) => {
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = params.theme;
  await snowpackDev(params);
};

export default serve;
