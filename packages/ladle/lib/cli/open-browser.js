/* eslint-disable @typescript-eslint/no-var-requires */
// adapted from https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/openBrowser.js

import { dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import defaultBrowser from "default-browser";
import open from "open";
import { createRequire } from "module";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://github.com/sindresorhus/open#app
var OSX_CHROME = "google chrome";

const Actions = Object.freeze({
  NONE: 0,
  BROWSER: 1,
  SCRIPT: 2,
});

/**
 *
 * @param {string | undefined | boolean} browser
 * @returns
 */
function getBrowserEnv(browser) {
  // Attempt to honor this environment variable.
  // It is specific to the operating system.
  // See https://github.com/sindresorhus/open#app for documentation.

  // some legacy values from Ladle v0.x
  browser = browser === true || browser === "**Default**" ? undefined : browser;
  const value = browser || process.env.BROWSER;
  const args = process.env.BROWSER_ARGS
    ? process.env.BROWSER_ARGS.split(" ")
    : [];
  let action;
  if (!value) {
    // Default.
    action = Actions.BROWSER;
  } else if (value.toLowerCase() === "none") {
    action = Actions.NONE;
  } else {
    action = Actions.BROWSER;
  }
  return { action, value, args };
}

/**
 *
 * @param {string | string[] | undefined} browser
 * @param {string} url
 * @param {string[]} args
 * @returns
 */
async function startBrowserProcess(browser, url, args) {
  const supportedChromiumBrowsers = [
    "Google Chrome Canary",
    "Google Chrome Dev",
    "Google Chrome Beta",
    "Google Chrome",
    "Microsoft Edge",
    "Brave Browser",
    "Vivaldi",
    "Chromium",
  ];

  let isDefaultChromium = true;

  try {
    // if no browser is set we prefer to use the system default
    const systemBrowser = await defaultBrowser();
    isDefaultChromium = supportedChromiumBrowsers.some((chrome) =>
      chrome
        .toLocaleLowerCase()
        .includes(systemBrowser.name.toLocaleLowerCase()),
    );
  } catch (e) {}

  // chromium is able to reuse open tabs so it needs special handling
  const shouldTryOpenChromiumWithAppleScript =
    process.platform === "darwin" &&
    ((typeof browser !== "string" && isDefaultChromium) ||
      browser === OSX_CHROME);

  if (shouldTryOpenChromiumWithAppleScript) {
    // Will use the first open browser found from list

    for (let chromiumBrowser of supportedChromiumBrowsers) {
      try {
        // Try our best to reuse existing tab
        // on OSX Chromium-based browser with AppleScript
        execSync('ps cax | grep "' + chromiumBrowser + '"');
        let cwd = __dirname;

        // in pnp we need to get cwd differently
        if (process.versions.pnp) {
          //@ts-ignore
          const require = createRequire(import.meta.url);
          //@ts-ignore
          const pnpApi = require("pnpapi");
          if (typeof pnpApi.resolveVirtual === "function") {
            cwd = pnpApi.resolveVirtual(cwd) || cwd;
          }
        }
        execSync(
          'osascript openChrome.applescript "' +
            encodeURI(url) +
            '" "' +
            chromiumBrowser +
            '"',
          {
            cwd,
            stdio: "ignore",
          },
        );
        return true;
      } catch (err) {}
    }
  }

  // Another special case: on OS X, check if BROWSER has been set to "open".
  // In this case, instead of passing `open` to `opn` (which won't work),
  // just ignore it (thus ensuring the intended behavior, i.e. opening the system browser):
  // https://github.com/facebook/create-react-app/pull/1690#issuecomment-283518768
  if (process.platform === "darwin" && browser === "open") {
    browser = undefined;
  }

  // If there are arguments, they must be passed as array with the browser
  if (typeof browser === "string" && args.length > 0) {
    browser = [browser].concat(args);
  }

  // Fallback to open
  // (It will always open new tab)
  try {
    var options = {
      ...(browser ? { app: { name: browser } } : {}),
      wait: false,
      url: true,
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
    return true;
  } catch (err) {
    return false;
  }
}

/**
 *
 * @param {string} url
 * @param {string | undefined} browser
 * @returns
 */
async function openBrowser(url, browser) {
  const { action, value, args } = getBrowserEnv(browser);
  switch (action) {
    case Actions.NONE:
      // Special case: BROWSER="none" will prevent opening completely.
      return false;
    case Actions.BROWSER:
      return startBrowserProcess(value, url, args);
    default:
      throw new Error("Not implemented.");
  }
}

export default openBrowser;
