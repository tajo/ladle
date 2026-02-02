/* eslint-disable @typescript-eslint/no-require-imports */
// @ts-nocheck
/**
 * @param {string} url
 */
export async function fetchAsync(url) {
  const response = await fetch(url, {
    method: "GET",
  });
  return {
    body: await response.text(),
    status: response.status,
    headers: response.headers,
  };
}
export function fetchThenEvalAsync(url) {
  return fetchAsync(url).then(({ body, status, headers }) => {
    if (
      headers?.has?.("Content-Type") != null &&
      headers.get("Content-Type").includes("application/json")
    ) {
      // Errors are returned as JSON.
      throw new Error(
        JSON.parse(body).message || `Unknown error fetching '${url}'`,
      );
    }

    if (status === 200) {
      return eval(body);
    } else {
      // Format Metro errors if possible.
      if (process.env.NODE_ENV === "development") {
        // body can be an error from Metro if a module is missing.
        // {"originModulePath":"/Users/evanbacon/Documents/GitHub/expo/.","targetModuleName":"./http://localhost:8081/node_modules/react-native/index.js","message":"..."}
        const error = JSON.parse(body);
        if (error) {
          // TODO: This is essentially like the Metro native red box errors. We should do a better job formatting them so
          // the user experience doesn't feel bad. This can be tested by loading a split bundle that results in a missing module error from Metro.
          throw new Error(error, url);
        }
      }

      throw new Error(`Failed to load split bundle from URL: ${url}\n${body}`);
    }
  });
}

/**
 * Given a path, create the dev server bundle URL.
 * @param {string} bundlePath like `/foobar`
 * @returns a full URL for Metro 0.83+ HMR compatibility
 */
export function buildUrlForBundle(bundlePath) {
  if (/^https?:\/\//.test(bundlePath)) {
    return bundlePath;
  }
  const { url: baseURL } = require("./getDevServer").default();
  return baseURL
    ? new URL(bundlePath, baseURL).toString()
    : `//${bundlePath.replace(/^\/+/, "")}`;
}

/**
 * @param {string} bundlePath
 */
export async function loadBundleAsync(bundlePath) {
  const requestUrl = buildUrlForBundle(bundlePath);

  if (process.env.NODE_ENV === "production") {
    return fetchThenEvalAsync(requestUrl);
  } else {
    return fetchThenEvalAsync(requestUrl).then(() => {
      const HMRClient = require("./HMRClient").default;
      HMRClient.registerBundle(requestUrl);
    });
  }
}
