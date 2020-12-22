#!/usr/bin/env node

import devBundler from "./dev-bundler";
import { DevParamsT } from "./types";

const serve = async (params: DevParamsT) => {
  process.env["SNOWPACK_PUBLIC_LADLE_THEME"] = params.theme;
  await devBundler(params);
};

export default serve;
