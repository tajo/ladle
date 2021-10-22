// @ts-nocheck

import * as react from "react";
import * as reactDom from "react-dom";

function _extends$1() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base,
        );
      },
    }),
    fn(module, module.exports),
    module.exports
  );
}

function commonjsRequire() {
  throw new Error(
    "Dynamic requires are not currently supported by @rollup/plugin-commonjs",
  );
}

/* VITE PROCESS POLYFILL (based on https://github.com/calvinmetcalf/node-process-es6) */
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== "undefined") {
  globalContext = window;
} else if (typeof self !== "undefined") {
  globalContext = self;
} else {
  globalContext = {};
}
if (typeof globalContext.setTimeout === "function") {
  cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === "function") {
  cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  }
  // if setTimeout wasn't available but was latter defined
  if (
    (cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
    setTimeout
  ) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  }
  // if clearTimeout wasn't available but was latter defined
  if (
    (cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) &&
    clearTimeout
  ) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;

  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
// v8 likes predictible objects
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
var title = "browser";
var platform = "browser";
var browser = true;
var argv = [];
var version = ""; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding(name) {
  throw new Error("process.binding is not supported");
}

function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance = globalContext.performance || {};
var performanceNow =
  performance.now ||
  performance.mozNow ||
  performance.msNow ||
  performance.oNow ||
  performance.webkitNow ||
  function () {
    return new Date().getTime();
  };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime % 1) * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: { NODE_ENV: "development" },
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime,
};

var objectAssign = function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/* eslint-disable no-restricted-globals, eqeqeq  */

/**
 * React currently throws a warning when using useLayoutEffect on the server.
 * To get around it, we can conditionally useEffect on the server (no-op) and
 * useLayoutEffect in the browser. We occasionally need useLayoutEffect to
 * ensure we don't get a render flash for certain operations, but we may also
 * need affected components to render on the server. One example is when setting
 * a component's descendants to retrieve their index values.
 *
 * Important to note that using this hook as an escape hatch will break the
 * eslint dependency warnings unless you rename the import to `useLayoutEffect`.
 * Use sparingly only when the effect won't effect the rendered HTML to avoid
 * any server/client mismatch.
 *
 * If a useLayoutEffect is needed and the result would create a mismatch, it's
 * likely that the component in question shouldn't be rendered on the server at
 * all, so a better approach would be to lazily render those in a parent
 * component after client-side hydration.
 *
 * TODO: We are calling useLayoutEffect in a couple of places that will likely
 * cause some issues for SSR users, whether the warning shows or not. Audit and
 * fix these.
 *
 * https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
 * https://github.com/reduxjs/react-redux/blob/master/src/utils/useIsomorphicLayoutEffect.js
 *
 * @param effect
 * @param deps
 */
var useIsomorphicLayoutEffect = /*#__PURE__*/ canUseDOM()
  ? react.useLayoutEffect
  : react.useEffect;
var checkedPkgs = {};
/**
 * When in dev mode, checks that styles for a given @reach package are loaded.
 *
 * @param packageName Name of the package to check.
 * @example checkStyles("dialog") will check for styles for @reach/dialog
 */

var checkStyles = noop;

{
  // In CJS files, "development" is stripped from our build, but we need
  // it to prevent style checks from clogging up user logs while testing.
  // This is a workaround until we can tweak the build a bit to accommodate.
  var _ref$1 =
      typeof process !== "undefined"
        ? process
        : {
            env: {
              NODE_ENV: "development",
            },
          },
    env = _ref$1.env;

  checkStyles = function checkStyles(packageName) {
    // only check once per package
    if (checkedPkgs[packageName]) return;
    checkedPkgs[packageName] = true;

    if (
      env.NODE_ENV !== "test" &&
      parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue("--reach-" + packageName),
        10,
      ) !== 1
    ) {
      console.warn(
        "@reach/" +
          packageName +
          ' styles not found. If you are using a bundler like webpack or parcel include this in the entry file of your app before any of your own styles:\n\n    import "@reach/' +
          packageName +
          '/styles.css";\n\n  Otherwise you\'ll need to include them some other way:\n\n    <link rel="stylesheet" type="text/css" href="node_modules/@reach/' +
          packageName +
          '/styles.css" />\n\n  For more information visit https://ui.reach.tech/styling.\n  ',
      );
    }
  };
}
/**
 * Passes or assigns an arbitrary value to a ref function or object.
 *
 * @param ref
 * @param value
 */

function assignRef$1(ref, value) {
  if (ref == null) return;

  if (isFunction(ref)) {
    ref(value);
  } else {
    try {
      ref.current = value;
    } catch (error) {
      throw new Error(
        'Cannot assign value "' + value + '" to ref "' + ref + '"',
      );
    }
  }
}
function canUseDOM() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}
/**
 * This is a hack for sure. The thing is, getting a component to intelligently
 * infer props based on a component or JSX string passed into an `as` prop is
 * kind of a huge pain. Getting it to work and satisfy the constraints of
 * `forwardRef` seems dang near impossible. To avoid needing to do this awkward
 * type song-and-dance every time we want to forward a ref into a component
 * that accepts an `as` prop, we abstract all of that mess to this function for
 * the time time being.
 */

function forwardRefWithAs(render) {
  return /*#__PURE__*/ react.forwardRef(render);
}
/**
 * Get an element's owner document. Useful when components are used in iframes
 * or other environments like dev tools.
 *
 * @param element
 */

function getOwnerDocument(element) {
  return canUseDOM() ? (element ? element.ownerDocument : document) : null;
}
/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */

function isFunction(value) {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Checks whether or not a value is a string.
 *
 * @param value
 */

function isString(value) {
  return typeof value === "string";
}
/**
 * No-op function.
 */

var useCheckStyles = noop;

{
  useCheckStyles = function useCheckStyles(pkg) {
    var name = react.useRef(pkg);
    react.useEffect(
      function () {
        return void (name.current = pkg);
      },
      [pkg],
    );
    react.useEffect(function () {
      return checkStyles(name.current);
    }, []);
  };
}
/**
 * Forces a re-render, similar to `forceUpdate` in class components.
 */

function useForceUpdate() {
  var _React$useState2 = react.useState(Object.create(null)),
    dispatch = _React$useState2[1];

  return react.useCallback(function () {
    dispatch(Object.create(null));
  }, []);
}
/**
 * Passes or assigns a value to multiple refs (typically a DOM node). Useful for
 * dealing with components that need an explicit ref for DOM calculations but
 * also forwards refs assigned by an app.
 *
 * @param refs Refs to fork
 */

function useForkedRef() {
  for (
    var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    refs[_key4] = arguments[_key4];
  }

  return react.useMemo(function () {
    if (
      refs.every(function (ref) {
        return ref == null;
      })
    ) {
      return null;
    }

    return function (node) {
      refs.forEach(function (ref) {
        assignRef$1(ref, node);
      });
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [].concat(refs));
}
/**
 * Wraps a lib-defined event handler and a user-defined event handler, returning
 * a single handler that allows a user to prevent lib-defined handlers from
 * firing.
 *
 * @param theirHandler User-supplied event handler
 * @param ourHandler Library-supplied event handler
 */

function wrapEvent(theirHandler, ourHandler) {
  return function (event) {
    theirHandler && theirHandler(event);

    if (!event.defaultPrevented) {
      return ourHandler(event);
    }
  };
} // Export types

/**
 * Welcome to @reach/portal!
 *
 * Creates and appends a DOM node to the end of `document.body` and renders a
 * React tree into it. Useful for rendering a natural React element hierarchy
 * with a different DOM hierarchy to prevent parent styles from clipping or
 * hiding content (for popovers, dropdowns, and modals).
 *
 * @see Docs   https://reach.tech/portal
 * @see Source https://github.com/reach/reach-ui/tree/main/packages/portal
 * @see React  https://reactjs.org/docs/portals.html
 */
/**
 * Portal
 *
 * @see Docs https://reach.tech/portal#portal
 */

var Portal = function Portal(_ref) {
  var children = _ref.children,
    _ref$type = _ref.type,
    type = _ref$type === void 0 ? "reach-portal" : _ref$type;
  var mountNode = react.useRef(null);
  var portalNode = react.useRef(null);
  var forceUpdate = useForceUpdate();
  useIsomorphicLayoutEffect(
    function () {
      // This ref may be null when a hot-loader replaces components on the page
      if (!mountNode.current) return; // It's possible that the content of the portal has, itself, been portaled.
      // In that case, it's important to append to the correct document element.

      var ownerDocument = mountNode.current.ownerDocument;
      portalNode.current =
        ownerDocument == null ? void 0 : ownerDocument.createElement(type);
      ownerDocument.body.appendChild(portalNode.current);
      forceUpdate();
      return function () {
        if (portalNode.current && portalNode.current.ownerDocument) {
          portalNode.current.ownerDocument.body.removeChild(portalNode.current);
        }
      };
    },
    [type, forceUpdate],
  );
  return portalNode.current
    ? /*#__PURE__*/ reactDom.createPortal(children, portalNode.current)
    : /*#__PURE__*/ react.createElement("span", {
        ref: mountNode,
      });
};
/**
 * @see Docs https://reach.tech/portal#portal-props
 */

{
  Portal.displayName = "Portal";
} ////////////////////////////////////////////////////////////////////////////////

function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var reactIs_development = createCommonjsModule(function (module, exports) {
  {
    (function () {
      // The Symbol used to tag the ReactElement-like types. If there is no native Symbol
      // nor polyfill, then a plain number is used for performance.
      var hasSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 0xeac7;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 0xeaca;
      var REACT_FRAGMENT_TYPE = hasSymbol
        ? Symbol.for("react.fragment")
        : 0xeacb;
      var REACT_STRICT_MODE_TYPE = hasSymbol
        ? Symbol.for("react.strict_mode")
        : 0xeacc;
      var REACT_PROFILER_TYPE = hasSymbol
        ? Symbol.for("react.profiler")
        : 0xead2;
      var REACT_PROVIDER_TYPE = hasSymbol
        ? Symbol.for("react.provider")
        : 0xeacd;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
      // (unstable) APIs that have been removed. Can we remove the symbols?

      var REACT_ASYNC_MODE_TYPE = hasSymbol
        ? Symbol.for("react.async_mode")
        : 0xeacf;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol
        ? Symbol.for("react.concurrent_mode")
        : 0xeacf;
      var REACT_FORWARD_REF_TYPE = hasSymbol
        ? Symbol.for("react.forward_ref")
        : 0xead0;
      var REACT_SUSPENSE_TYPE = hasSymbol
        ? Symbol.for("react.suspense")
        : 0xead1;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol
        ? Symbol.for("react.suspense_list")
        : 0xead8;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 0xead3;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 0xead4;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 0xead9;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol
        ? Symbol.for("react.fundamental")
        : 0xead5;
      var REACT_RESPONDER_TYPE = hasSymbol
        ? Symbol.for("react.responder")
        : 0xead6;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 0xead7;

      function isValidElementType(type) {
        return (
          typeof type === "string" ||
          typeof type === "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
          type === REACT_FRAGMENT_TYPE ||
          type === REACT_CONCURRENT_MODE_TYPE ||
          type === REACT_PROFILER_TYPE ||
          type === REACT_STRICT_MODE_TYPE ||
          type === REACT_SUSPENSE_TYPE ||
          type === REACT_SUSPENSE_LIST_TYPE ||
          (typeof type === "object" &&
            type !== null &&
            (type.$$typeof === REACT_LAZY_TYPE ||
              type.$$typeof === REACT_MEMO_TYPE ||
              type.$$typeof === REACT_PROVIDER_TYPE ||
              type.$$typeof === REACT_CONTEXT_TYPE ||
              type.$$typeof === REACT_FORWARD_REF_TYPE ||
              type.$$typeof === REACT_FUNDAMENTAL_TYPE ||
              type.$$typeof === REACT_RESPONDER_TYPE ||
              type.$$typeof === REACT_SCOPE_TYPE ||
              type.$$typeof === REACT_BLOCK_TYPE))
        );
      }

      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;

          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;

              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;

                default:
                  var $$typeofType = type && type.$$typeof;

                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;

                    default:
                      return $$typeof;
                  }
              }

            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }

        return undefined;
      } // AsyncMode is deprecated along with isAsyncMode

      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

            console["warn"](
              "The ReactIs.isAsyncMode() alias has been deprecated, " +
                "and will be removed in React 17+. Update your code to use " +
                "ReactIs.isConcurrentMode() instead. It has the exact same API.",
            );
          }
        }

        return (
          isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE
        );
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return (
          typeof object === "object" &&
          object !== null &&
          object.$$typeof === REACT_ELEMENT_TYPE
        );
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }

      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

var reactIs = createCommonjsModule(function (module) {
  {
    module.exports = reactIs_development;
  }
});

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$1 = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";

var ReactPropTypesSecret_1 = ReactPropTypesSecret$1;

var printWarning$1 = function () {};

{
  var ReactPropTypesSecret = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function (text) {
    var message = "Warning: " + text;
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== "function") {
            var err = Error(
              (componentName || "React class") +
                ": " +
                location +
                " type `" +
                typeSpecName +
                "` is invalid; " +
                "it must be a function, usually from the `prop-types` package, but received `" +
                typeof typeSpecs[typeSpecName] +
                "`.",
            );
            err.name = "Invariant Violation";
            throw err;
          }
          error = typeSpecs[typeSpecName](
            values,
            typeSpecName,
            componentName,
            location,
            null,
            ReactPropTypesSecret,
          );
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || "React class") +
              ": type specification of " +
              location +
              " `" +
              typeSpecName +
              "` is invalid; the type checker " +
              "function must return `null` or an `Error` but returned a " +
              typeof error +
              ". " +
              "You may have forgotten to pass an argument to the type checker " +
              "creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and " +
              "shape all require an argument).",
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : "";

          printWarning$1(
            "Failed " +
              location +
              " type: " +
              error.message +
              (stack != null ? stack : ""),
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function () {
  {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes;

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function () {};

{
  printWarning = function (text) {
    var message = "Warning: " + text;
    if (typeof console !== "undefined") {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function (isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator"; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn =
      maybeIterable &&
      ((ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL]) ||
        maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === "function") {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = "<<anonymous>>";

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker("array"),
    bool: createPrimitiveTypeChecker("boolean"),
    func: createPrimitiveTypeChecker("function"),
    number: createPrimitiveTypeChecker("number"),
    object: createPrimitiveTypeChecker("object"),
    string: createPrimitiveTypeChecker("string"),
    symbol: createPrimitiveTypeChecker("symbol"),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = "";
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(
      isRequired,
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret,
    ) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret_1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            "Calling PropTypes validators directly is not supported by the `prop-types` package. " +
              "Use `PropTypes.checkPropTypes()` to call them. " +
              "Read more at http://fb.me/use-check-prop-types",
          );
          err.name = "Invariant Violation";
          throw err;
        } else if (typeof console !== "undefined") {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ":" + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              "You are manually calling a React.PropTypes validation " +
                "function for the `" +
                propFullName +
                "` prop on `" +
                componentName +
                "`. This is deprecated " +
                "and will throw in the standalone `prop-types` package. " +
                "You may be seeing this warning due to a third-party PropTypes " +
                "library. See https://fb.me/react-warning-dont-call-proptypes " +
                "for details.",
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError(
              "The " +
                location +
                " `" +
                propFullName +
                "` is marked as required " +
                ("in `" + componentName + "`, but its value is `null`."),
            );
          }
          return new PropTypeError(
            "The " +
              location +
              " `" +
              propFullName +
              "` is marked as required in " +
              ("`" + componentName + "`, but its value is `undefined`."),
          );
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(
      props,
      propName,
      componentName,
      location,
      propFullName,
      secret,
    ) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              preciseType +
              "` supplied to `" +
              componentName +
              "`, expected ") +
            ("`" + expectedType + "`."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside arrayOf.",
        );
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected an array."),
        );
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(
          propValue,
          i,
          componentName,
          location,
          propFullName + "[" + i + "]",
          ReactPropTypesSecret_1,
        );
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected a single ReactElement."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!reactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected a single ReactElement type."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              actualClassName +
              "` supplied to `" +
              componentName +
              "`, expected ") +
            ("instance of `" + expectedClassName + "`."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      {
        if (arguments.length > 1) {
          printWarning(
            "Invalid arguments supplied to oneOf, expected an array, got " +
              arguments.length +
              " arguments. " +
              "A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).",
          );
        } else {
          printWarning(
            "Invalid argument supplied to oneOf, expected an array.",
          );
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(
        expectedValues,
        function replacer(key, value) {
          var type = getPreciseType(value);
          if (type === "symbol") {
            return String(value);
          }
          return value;
        },
      );
      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` of value `" +
          String(propValue) +
          "` " +
          ("supplied to `" +
            componentName +
            "`, expected one of " +
            valuesString +
            "."),
      );
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== "function") {
        return new PropTypeError(
          "Property `" +
            propFullName +
            "` of component `" +
            componentName +
            "` has invalid PropType notation inside objectOf.",
        );
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type " +
            ("`" +
              propType +
              "` supplied to `" +
              componentName +
              "`, expected an object."),
        );
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(
            propValue,
            key,
            componentName,
            location,
            propFullName + "." + key,
            ReactPropTypesSecret_1,
          );
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      printWarning(
        "Invalid argument supplied to oneOfType, expected an instance of array.",
      );
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== "function") {
        printWarning(
          "Invalid argument supplied to oneOfType. Expected an array of check functions, but " +
            "received " +
            getPostfixForTypeWarning(checker) +
            " at index " +
            i +
            ".",
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (
          checker(
            props,
            propName,
            componentName,
            location,
            propFullName,
            ReactPropTypesSecret_1,
          ) == null
        ) {
          return null;
        }
      }

      return new PropTypeError(
        "Invalid " +
          location +
          " `" +
          propFullName +
          "` supplied to " +
          ("`" + componentName + "`."),
      );
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` supplied to " +
            ("`" + componentName + "`, expected a ReactNode."),
        );
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type `" +
            propType +
            "` " +
            ("supplied to `" + componentName + "`, expected `object`."),
        );
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + "." + key,
          ReactPropTypesSecret_1,
        );
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== "object") {
        return new PropTypeError(
          "Invalid " +
            location +
            " `" +
            propFullName +
            "` of type `" +
            propType +
            "` " +
            ("supplied to `" + componentName + "`, expected `object`."),
        );
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = objectAssign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            "Invalid " +
              location +
              " `" +
              propFullName +
              "` key `" +
              key +
              "` supplied to `" +
              componentName +
              "`." +
              "\nBad object: " +
              JSON.stringify(props[propName], null, "  ") +
              "\nValid keys: " +
              JSON.stringify(Object.keys(shapeTypes), null, "  "),
          );
        }
        var error = checker(
          propValue,
          key,
          componentName,
          location,
          propFullName + "." + key,
          ReactPropTypesSecret_1,
        );
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case "number":
      case "string":
      case "undefined":
        return true;
      case "boolean":
        return !propValue;
      case "object":
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === "symbol") {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue["@@toStringTag"] === "Symbol") {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === "function" && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return "array";
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return "object";
    }
    if (isSymbol(propType, propValue)) {
      return "symbol";
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === "undefined" || propValue === null) {
      return "" + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === "object") {
      if (propValue instanceof Date) {
        return "date";
      } else if (propValue instanceof RegExp) {
        return "regexp";
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case "array":
      case "object":
        return "an " + type;
      case "boolean":
      case "date":
      case "regexp":
        return "a " + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes_1;
  ReactPropTypes.resetWarningCache = checkPropTypes_1.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes$1 = createCommonjsModule(function (module) {
  /**
   * Copyright (c) 2013-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */

  {
    var ReactIs = reactIs;

    // By explicitly using `prop-types` you are opting into new development behavior.
    // http://fb.me/prop-types-in-prod
    var throwOnDirectAccess = true;
    module.exports = factoryWithTypeCheckers(
      ReactIs.isElement,
      throwOnDirectAccess,
    );
  }
});

var FOCUS_GROUP = "data-focus-lock";
var FOCUS_DISABLED = "data-focus-lock-disabled";
var FOCUS_ALLOW = "data-no-focus-lock";
var FOCUS_AUTO = "data-autofocus-inside";

/**
 * Assigns a value for a given ref, no matter of the ref format
 * @param {RefObject} ref - a callback function or ref object
 * @param value - a new value
 *
 * @see https://github.com/theKashey/use-callback-ref#assignref
 * @example
 * const refObject = useRef();
 * const refFn = (ref) => {....}
 *
 * assignRef(refObject, "refValue");
 * assignRef(refFn, "refValue");
 */
function assignRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
  return ref;
}

/**
 * creates a MutableRef with ref change callback
 * @param initialValue - initial ref value
 * @param {Function} callback - a callback to run when value changes
 *
 * @example
 * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);
 * ref.current = 1;
 * // prints 0 -> 1
 *
 * @see https://reactjs.org/docs/hooks-reference.html#useref
 * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref
 * @returns {MutableRefObject}
 */
function useCallbackRef(initialValue, callback) {
  var ref = react.useState(function () {
    return {
      // value
      value: initialValue,
      // last callback
      callback: callback,
      // "memoized" public interface
      facade: {
        get current() {
          return ref.value;
        },
        set current(value) {
          var last = ref.value;
          if (last !== value) {
            ref.value = value;
            ref.callback(value, last);
          }
        },
      },
    };
  })[0];
  // update callback
  ref.callback = callback;
  return ref.facade;
}

/**
 * Merges two or more refs together providing a single interface to set their value
 * @param {RefObject|Ref} refs
 * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}
 *
 * @see {@link mergeRefs} a version without buit-in memoization
 * @see https://github.com/theKashey/use-callback-ref#usemergerefs
 * @example
 * const Component = React.forwardRef((props, ref) => {
 *   const ownRef = useRef();
 *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together
 *   return <div ref={domRef}>...</div>
 * }
 */
function useMergeRefs(refs, defaultValue) {
  return useCallbackRef(defaultValue, function (newValue) {
    return refs.forEach(function (ref) {
      return assignRef(ref, newValue);
    });
  });
}

var hiddenGuard = {
  width: "1px",
  height: "0px",
  padding: 0,
  overflow: "hidden",
  position: "fixed",
  top: "1px",
  left: "1px",
};

({
  children: propTypes$1.node,
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign$1 = function () {
  __assign$1 =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign$1.apply(this, arguments);
};

function __rest$1(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

function ItoI(a) {
  return a;
}
function innerCreateMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  var buffer = [];
  var assigned = false;
  var medium = {
    read: function () {
      if (assigned) {
        throw new Error(
          "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.",
        );
      }
      if (buffer.length) {
        return buffer[buffer.length - 1];
      }
      return defaults;
    },
    useMedium: function (data) {
      var item = middleware(data, assigned);
      buffer.push(item);
      return function () {
        buffer = buffer.filter(function (x) {
          return x !== item;
        });
      };
    },
    assignSyncMedium: function (cb) {
      assigned = true;
      while (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
      }
      buffer = {
        push: function (x) {
          return cb(x);
        },
        filter: function () {
          return buffer;
        },
      };
    },
    assignMedium: function (cb) {
      assigned = true;
      var pendingQueue = [];
      if (buffer.length) {
        var cbs = buffer;
        buffer = [];
        cbs.forEach(cb);
        pendingQueue = buffer;
      }
      var executeQueue = function () {
        var cbs = pendingQueue;
        pendingQueue = [];
        cbs.forEach(cb);
      };
      var cycle = function () {
        return Promise.resolve().then(executeQueue);
      };
      cycle();
      buffer = {
        push: function (x) {
          pendingQueue.push(x);
          cycle();
        },
        filter: function (filter) {
          pendingQueue = pendingQueue.filter(filter);
          return buffer;
        },
      };
    },
  };
  return medium;
}
function createMedium(defaults, middleware) {
  if (middleware === void 0) {
    middleware = ItoI;
  }
  return innerCreateMedium(defaults, middleware);
}
function createSidecarMedium(options) {
  if (options === void 0) {
    options = {};
  }
  var medium = innerCreateMedium(null);
  medium.options = __assign$1({ async: true, ssr: false }, options);
  return medium;
}

var SideCar$1 = function (_a) {
  var sideCar = _a.sideCar,
    rest = __rest$1(_a, ["sideCar"]);
  if (!sideCar) {
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car",
    );
  }
  var Target = sideCar.read();
  if (!Target) {
    throw new Error("Sidecar medium not found");
  }
  return react.createElement(Target, __assign$1({}, rest));
};
SideCar$1.isSideCarExport = true;
function exportSidecar(medium, exported) {
  medium.useMedium(exported);
  return SideCar$1;
}

var mediumFocus = createMedium({}, function (_ref) {
  var target = _ref.target,
    currentTarget = _ref.currentTarget;
  return {
    target: target,
    currentTarget: currentTarget,
  };
});
var mediumBlur = createMedium();
var mediumEffect = createMedium();
var mediumSidecar = createSidecarMedium({
  async: true,
});

var emptyArray = [];
var FocusLock = /*#__PURE__*/ react.forwardRef(function FocusLockUI(
  props,
  parentRef,
) {
  var _extends2;

  var _React$useState = react.useState(),
    realObserved = _React$useState[0],
    setObserved = _React$useState[1];

  var observed = react.useRef();
  var isActive = react.useRef(false);
  var originalFocusedElement = react.useRef(null);
  var children = props.children,
    disabled = props.disabled,
    noFocusGuards = props.noFocusGuards,
    persistentFocus = props.persistentFocus,
    crossFrame = props.crossFrame,
    autoFocus = props.autoFocus,
    allowTextSelection = props.allowTextSelection,
    group = props.group,
    className = props.className,
    whiteList = props.whiteList,
    _props$shards = props.shards,
    shards = _props$shards === void 0 ? emptyArray : _props$shards,
    _props$as = props.as,
    Container = _props$as === void 0 ? "div" : _props$as,
    _props$lockProps = props.lockProps,
    containerProps = _props$lockProps === void 0 ? {} : _props$lockProps,
    SideCar = props.sideCar,
    shouldReturnFocus = props.returnFocus,
    onActivationCallback = props.onActivation,
    onDeactivationCallback = props.onDeactivation;

  var _React$useState2 = react.useState({}),
    id = _React$useState2[0]; // SIDE EFFECT CALLBACKS

  var onActivation = react.useCallback(
    function () {
      originalFocusedElement.current =
        originalFocusedElement.current || (document && document.activeElement);

      if (observed.current && onActivationCallback) {
        onActivationCallback(observed.current);
      }

      isActive.current = true;
    },
    [onActivationCallback],
  );
  var onDeactivation = react.useCallback(
    function () {
      isActive.current = false;

      if (onDeactivationCallback) {
        onDeactivationCallback(observed.current);
      }
    },
    [onDeactivationCallback],
  );
  var returnFocus = react.useCallback(
    function (allowDefer) {
      var current = originalFocusedElement.current;

      if (Boolean(shouldReturnFocus) && current && current.focus) {
        var focusOptions =
          typeof shouldReturnFocus === "object" ? shouldReturnFocus : undefined;
        originalFocusedElement.current = null;

        if (allowDefer) {
          // React might return focus after update
          // it's safer to defer the action
          Promise.resolve().then(function () {
            return current.focus(focusOptions);
          });
        } else {
          current.focus(focusOptions);
        }
      }
    },
    [shouldReturnFocus],
  ); // MEDIUM CALLBACKS

  var onFocus = react.useCallback(function (event) {
    if (isActive.current) {
      mediumFocus.useMedium(event);
    }
  }, []);
  var onBlur = mediumBlur.useMedium; // REF PROPAGATION
  // not using real refs due to race conditions

  var setObserveNode = react.useCallback(function (newObserved) {
    if (observed.current !== newObserved) {
      observed.current = newObserved;
      setObserved(newObserved);
    }
  }, []);

  {
    if (typeof allowTextSelection !== "undefined") {
      // eslint-disable-next-line no-console
      console.warn(
        "React-Focus-Lock: allowTextSelection is deprecated and enabled by default",
      );
    }

    react.useEffect(function () {
      if (!observed.current) {
        // eslint-disable-next-line no-console
        console.error("FocusLock: could not obtain ref to internal node");
      }
    }, []);
  }

  var lockProps = _extends$1(
    ((_extends2 = {}),
    (_extends2[FOCUS_DISABLED] = disabled && "disabled"),
    (_extends2[FOCUS_GROUP] = group),
    _extends2),
    containerProps,
  );

  var hasLeadingGuards = noFocusGuards !== true;
  var hasTailingGuards = hasLeadingGuards && noFocusGuards !== "tail";
  var mergedRef = useMergeRefs([parentRef, setObserveNode]);
  return /*#__PURE__*/ react.createElement(
    react.Fragment,
    null,
    hasLeadingGuards && [
      /*#__PURE__*/ react.createElement("div", {
        key: "guard-first",
        "data-focus-guard": true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      }),
      /*#__PURE__*/
      // nearest focus guard
      react.createElement("div", {
        key: "guard-nearest",
        "data-focus-guard": true,
        tabIndex: disabled ? -1 : 1,
        style: hiddenGuard,
      }), // first tabbed element guard
    ],
    !disabled &&
      /*#__PURE__*/ react.createElement(SideCar, {
        id: id,
        sideCar: mediumSidecar,
        observed: realObserved,
        disabled: disabled,
        persistentFocus: persistentFocus,
        crossFrame: crossFrame,
        autoFocus: autoFocus,
        whiteList: whiteList,
        shards: shards,
        onActivation: onActivation,
        onDeactivation: onDeactivation,
        returnFocus: returnFocus,
      }),
    /*#__PURE__*/ react.createElement(
      Container,
      _extends$1(
        {
          ref: mergedRef,
        },
        lockProps,
        {
          className: className,
          onBlur: onBlur,
          onFocus: onFocus,
        },
      ),
      children,
    ),
    hasTailingGuards &&
      /*#__PURE__*/ react.createElement("div", {
        "data-focus-guard": true,
        tabIndex: disabled ? -1 : 0,
        style: hiddenGuard,
      }),
  );
});
FocusLock.propTypes = {
  children: propTypes$1.node,
  disabled: propTypes$1.bool,
  returnFocus: propTypes$1.oneOfType([propTypes$1.bool, propTypes$1.object]),
  noFocusGuards: propTypes$1.bool,
  allowTextSelection: propTypes$1.bool,
  autoFocus: propTypes$1.bool,
  persistentFocus: propTypes$1.bool,
  crossFrame: propTypes$1.bool,
  group: propTypes$1.string,
  className: propTypes$1.string,
  whiteList: propTypes$1.func,
  shards: propTypes$1.arrayOf(propTypes$1.any),
  as: propTypes$1.oneOfType([
    propTypes$1.string,
    propTypes$1.func,
    propTypes$1.object,
  ]),
  lockProps: propTypes$1.object,
  onActivation: propTypes$1.func,
  onDeactivation: propTypes$1.func,
  sideCar: propTypes$1.any.isRequired,
};
FocusLock.defaultProps = {
  children: undefined,
  disabled: false,
  returnFocus: false,
  noFocusGuards: false,
  autoFocus: true,
  persistentFocus: false,
  crossFrame: true,
  allowTextSelection: undefined,
  group: undefined,
  className: undefined,
  whiteList: undefined,
  shards: undefined,
  as: "div",
  lockProps: {},
  onActivation: undefined,
  onDeactivation: undefined,
};

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

  return _setPrototypeOf(o, p);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function withSideEffect(reducePropsToState, handleStateChangeOnClient) {
  {
    if (typeof reducePropsToState !== "function") {
      throw new Error("Expected reducePropsToState to be a function.");
    }

    if (typeof handleStateChangeOnClient !== "function") {
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    }
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }

  return function wrap(WrappedComponent) {
    {
      if (typeof WrappedComponent !== "function") {
        throw new Error("Expected WrappedComponent to be a React component.");
      }
    }

    var mountedInstances = [];
    var state;

    function emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
    }

    var SideEffect = /*#__PURE__*/ (function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      var _proto = SideEffect.prototype;

      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/ react.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    })(react.PureComponent);

    _defineProperty(
      SideEffect,
      "displayName",
      "SideEffect(" + getDisplayName(WrappedComponent) + ")",
    );

    return SideEffect;
  };
}

var toArray = function (a) {
  var ret = Array(a.length);
  for (var i = 0; i < a.length; ++i) {
    ret[i] = a[i];
  }
  return ret;
};
var asArray = function (a) {
  return Array.isArray(a) ? a : [a];
};

var filterNested = function (nodes) {
  var contained = new Set();
  var l = nodes.length;
  for (var i = 0; i < l; i += 1) {
    for (var j = i + 1; j < l; j += 1) {
      var position = nodes[i].compareDocumentPosition(nodes[j]);
      if ((position & Node.DOCUMENT_POSITION_CONTAINED_BY) > 0) {
        contained.add(j);
      }
      if ((position & Node.DOCUMENT_POSITION_CONTAINS) > 0) {
        contained.add(i);
      }
    }
  }
  return nodes.filter(function (_, index) {
    return !contained.has(index);
  });
};
var getTopParent = function (node) {
  return node.parentNode ? getTopParent(node.parentNode) : node;
};
var getAllAffectedNodes = function (node) {
  var nodes = asArray(node);
  return nodes.filter(Boolean).reduce(function (acc, currentNode) {
    var group = currentNode.getAttribute(FOCUS_GROUP);
    acc.push.apply(
      acc,
      group
        ? filterNested(
            toArray(
              getTopParent(currentNode).querySelectorAll(
                "[" +
                  FOCUS_GROUP +
                  '="' +
                  group +
                  '"]:not([' +
                  FOCUS_DISABLED +
                  '="disabled"])',
              ),
            ),
          )
        : [currentNode],
    );
    return acc;
  }, []);
};

var isElementHidden = function (computedStyle) {
  if (!computedStyle || !computedStyle.getPropertyValue) {
    return false;
  }
  return (
    computedStyle.getPropertyValue("display") === "none" ||
    computedStyle.getPropertyValue("visibility") === "hidden"
  );
};
var isVisible = function (node) {
  return (
    !node ||
    node === document ||
    (node && node.nodeType === Node.DOCUMENT_NODE) ||
    (!isElementHidden(window.getComputedStyle(node, null)) &&
      isVisible(
        node.parentNode &&
          node.parentNode.nodeType === Node.DOCUMENT_FRAGMENT_NODE
          ? node.parentNode.host
          : node.parentNode,
      ))
  );
};
var notHiddenInput = function (node) {
  return !(
    (node.tagName === "INPUT" || node.tagName === "BUTTON") &&
    (node.type === "hidden" || node.disabled)
  );
};
var isGuard = function (node) {
  return Boolean(node && node.dataset && node.dataset.focusGuard);
};
var isNotAGuard = function (node) {
  return !isGuard(node);
};
var isDefined = function (x) {
  return Boolean(x);
};

var tabSort = function (a, b) {
  var tabDiff = a.tabIndex - b.tabIndex;
  var indexDiff = a.index - b.index;
  if (tabDiff) {
    if (!a.tabIndex) {
      return 1;
    }
    if (!b.tabIndex) {
      return -1;
    }
  }
  return tabDiff || indexDiff;
};
var orderByTabIndex = function (nodes, filterNegative, keepGuards) {
  return toArray(nodes)
    .map(function (node, index) {
      return {
        node: node,
        index: index,
        tabIndex:
          keepGuards && node.tabIndex === -1
            ? (node.dataset || {}).focusGuard
              ? 0
              : -1
            : node.tabIndex,
      };
    })
    .filter(function (data) {
      return !filterNegative || data.tabIndex >= 0;
    })
    .sort(tabSort);
};

var tabbables = [
  "button:enabled",
  "select:enabled",
  "textarea:enabled",
  "input:enabled",
  "a[href]",
  "area[href]",
  "summary",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "[tabindex]",
  "[contenteditable]",
  "[autofocus]",
];

var queryTabbables = tabbables.join(",");
var queryGuardTabbables = queryTabbables + ", [data-focus-guard]";
var getFocusables = function (parents, withGuards) {
  return parents.reduce(function (acc, parent) {
    return acc.concat(
      toArray(
        parent.querySelectorAll(
          withGuards ? queryGuardTabbables : queryTabbables,
        ),
      ),
      parent.parentNode
        ? toArray(parent.parentNode.querySelectorAll(queryTabbables)).filter(
            function (node) {
              return node === parent;
            },
          )
        : [],
    );
  }, []);
};
var getParentAutofocusables = function (parent) {
  var parentFocus = parent.querySelectorAll("[" + FOCUS_AUTO + "]");
  return toArray(parentFocus)
    .map(function (node) {
      return getFocusables([node]);
    })
    .reduce(function (acc, nodes) {
      return acc.concat(nodes);
    }, []);
};

var filterFocusable = function (nodes) {
  return toArray(nodes)
    .filter(function (node) {
      return isVisible(node);
    })
    .filter(function (node) {
      return notHiddenInput(node);
    });
};
var getTabbableNodes = function (topNodes, withGuards) {
  return orderByTabIndex(
    filterFocusable(getFocusables(topNodes, withGuards)),
    true,
    withGuards,
  );
};
var getAllTabbableNodes = function (topNodes) {
  return orderByTabIndex(filterFocusable(getFocusables(topNodes)), false);
};
var parentAutofocusables = function (topNode) {
  return filterFocusable(getParentAutofocusables(topNode));
};

var getParents = function (node, parents) {
  if (parents === void 0) {
    parents = [];
  }
  parents.push(node);
  if (node.parentNode) {
    getParents(node.parentNode, parents);
  }
  return parents;
};
var getCommonParent = function (nodeA, nodeB) {
  var parentsA = getParents(nodeA);
  var parentsB = getParents(nodeB);
  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};
var getTopCommonParent = function (baseActiveElement, leftEntry, rightEntries) {
  var activeElements = asArray(baseActiveElement);
  var leftEntries = asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = false;
  leftEntries.filter(Boolean).forEach(function (entry) {
    topCommon = getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function (subEntry) {
      var common = getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || common.contains(topCommon)) {
          topCommon = common;
        } else {
          topCommon = getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};
var allParentAutofocusables = function (entries) {
  return entries.reduce(function (acc, node) {
    return acc.concat(parentAutofocusables(node));
  }, []);
};

var getFocusabledIn = function (topNode) {
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(topNode, topNode, entries);
  var outerNodes = getTabbableNodes([commonParent], true);
  var innerElements = getTabbableNodes(entries)
    .filter(function (_a) {
      var node = _a.node;
      return isNotAGuard(node);
    })
    .map(function (_a) {
      var node = _a.node;
      return node;
    });
  return outerNodes.map(function (_a) {
    var node = _a.node,
      index = _a.index;
    return {
      node: node,
      index: index,
      lockItem: innerElements.indexOf(node) >= 0,
      guard: isGuard(node),
    };
  });
};

var focusInFrame = function (frame) {
  return frame === document.activeElement;
};
var focusInsideIframe = function (topNode) {
  return Boolean(
    toArray(topNode.querySelectorAll("iframe")).some(function (node) {
      return focusInFrame(node);
    }),
  );
};
var focusInside = function (topNode) {
  var activeElement = document && document.activeElement;
  if (
    !activeElement ||
    (activeElement.dataset && activeElement.dataset.focusGuard)
  ) {
    return false;
  }
  return getAllAffectedNodes(topNode).reduce(function (result, node) {
    return result || node.contains(activeElement) || focusInsideIframe(node);
  }, false);
};

var focusIsHidden = function () {
  return (
    document &&
    toArray(document.querySelectorAll("[" + FOCUS_ALLOW + "]")).some(function (
      node,
    ) {
      return node.contains(document.activeElement);
    })
  );
};

var isRadio = function (node) {
  return node.tagName === "INPUT" && node.type === "radio";
};
var findSelectedRadio = function (node, nodes) {
  return (
    nodes
      .filter(isRadio)
      .filter(function (el) {
        return el.name === node.name;
      })
      .filter(function (el) {
        return el.checked;
      })[0] || node
  );
};
var correctNode = function (node, nodes) {
  if (isRadio(node) && node.name) {
    return findSelectedRadio(node, nodes);
  }
  return node;
};
var correctNodes = function (nodes) {
  var resultSet = new Set();
  nodes.forEach(function (node) {
    return resultSet.add(correctNode(node, nodes));
  });
  return nodes.filter(function (node) {
    return resultSet.has(node);
  });
};

var pickFirstFocus = function (nodes) {
  if (nodes[0] && nodes.length > 1) {
    return correctNode(nodes[0], nodes);
  }
  return nodes[0];
};
var pickFocusable = function (nodes, index) {
  if (nodes.length > 1) {
    return nodes.indexOf(correctNode(nodes[index], nodes));
  }
  return index;
};

var NEW_FOCUS = "NEW_FOCUS";
var newFocus = function (innerNodes, outerNodes, activeElement, lastNode) {
  var cnt = innerNodes.length;
  var firstFocus = innerNodes[0];
  var lastFocus = innerNodes[cnt - 1];
  var isOnGuard = isGuard(activeElement);
  if (innerNodes.indexOf(activeElement) >= 0) {
    return undefined;
  }
  var activeIndex = outerNodes.indexOf(activeElement);
  var lastIndex = lastNode ? outerNodes.indexOf(lastNode) : activeIndex;
  var lastNodeInside = lastNode ? innerNodes.indexOf(lastNode) : -1;
  var indexDiff = activeIndex - lastIndex;
  var firstNodeIndex = outerNodes.indexOf(firstFocus);
  var lastNodeIndex = outerNodes.indexOf(lastFocus);
  var correctedNodes = correctNodes(outerNodes);
  var correctedIndexDiff =
    correctedNodes.indexOf(activeElement) -
    (lastNode ? correctedNodes.indexOf(lastNode) : activeIndex);
  var returnFirstNode = pickFocusable(innerNodes, 0);
  var returnLastNode = pickFocusable(innerNodes, cnt - 1);
  if (activeIndex === -1 || lastNodeInside === -1) {
    return NEW_FOCUS;
  }
  if (!indexDiff && lastNodeInside >= 0) {
    return lastNodeInside;
  }
  if (activeIndex <= firstNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnLastNode;
  }
  if (activeIndex >= lastNodeIndex && isOnGuard && Math.abs(indexDiff) > 1) {
    return returnFirstNode;
  }
  if (indexDiff && Math.abs(correctedIndexDiff) > 1) {
    return lastNodeInside;
  }
  if (activeIndex <= firstNodeIndex) {
    return returnLastNode;
  }
  if (activeIndex > lastNodeIndex) {
    return returnFirstNode;
  }
  if (indexDiff) {
    if (Math.abs(indexDiff) > 1) {
      return lastNodeInside;
    }
    return (cnt + lastNodeInside + indexDiff) % cnt;
  }
  return undefined;
};

var findAutoFocused = function (autoFocusables) {
  return function (node) {
    return (
      node.autofocus ||
      (node.dataset && !!node.dataset.autofocus) ||
      autoFocusables.indexOf(node) >= 0
    );
  };
};
var reorderNodes = function (srcNodes, dstNodes) {
  var remap = new Map();
  dstNodes.forEach(function (entity) {
    return remap.set(entity.node, entity);
  });
  return srcNodes
    .map(function (node) {
      return remap.get(node);
    })
    .filter(isDefined);
};
var getFocusMerge = function (topNode, lastNode) {
  var activeElement = document && document.activeElement;
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(
    activeElement || topNode,
    topNode,
    entries,
  );
  var anyFocusable = getAllTabbableNodes(entries);
  var innerElements = getTabbableNodes(entries).filter(function (_a) {
    var node = _a.node;
    return isNotAGuard(node);
  });
  if (!innerElements[0]) {
    innerElements = anyFocusable;
    if (!innerElements[0]) {
      return undefined;
    }
  }
  var outerNodes = getAllTabbableNodes([commonParent]).map(function (_a) {
    var node = _a.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function (_a) {
    var node = _a.node;
    return node;
  });
  var newId = newFocus(innerNodes, outerNodes, activeElement, lastNode);
  if (newId === NEW_FOCUS) {
    var autoFocusable = anyFocusable
      .map(function (_a) {
        var node = _a.node;
        return node;
      })
      .filter(findAutoFocused(allParentAutofocusables(entries)));
    return {
      node:
        autoFocusable && autoFocusable.length
          ? pickFirstFocus(autoFocusable)
          : pickFirstFocus(innerNodes),
    };
  }
  if (newId === undefined) {
    return newId;
  }
  return orderedInnerElements[newId];
};

var focusOn = function (target) {
  target.focus();
  if ("contentWindow" in target && target.contentWindow) {
    target.contentWindow.focus();
  }
};
var guardCount = 0;
var lockDisabled = false;
var setFocus = function (topNode, lastNode) {
  var focusable = getFocusMerge(topNode, lastNode);
  if (lockDisabled) {
    return;
  }
  if (focusable) {
    if (guardCount > 2) {
      console.error(
        "FocusLock: focus-fighting detected. Only one focus management system could be active. " +
          "See https://github.com/theKashey/focus-lock/#focus-fighting",
      );
      lockDisabled = true;
      setTimeout(function () {
        lockDisabled = false;
      }, 1);
      return;
    }
    guardCount++;
    focusOn(focusable.node);
    guardCount--;
  }
};

function deferAction(action) {
  // Hidding setImmediate from Webpack to avoid inserting polyfill
  var _window = window,
    setImmediate = _window.setImmediate;

  if (typeof setImmediate !== "undefined") {
    setImmediate(action);
  } else {
    setTimeout(action, 1);
  }
}

var focusOnBody = function focusOnBody() {
  return document && document.activeElement === document.body;
};

var isFreeFocus = function isFreeFocus() {
  return focusOnBody() || focusIsHidden();
};

var lastActiveTrap = null;
var lastActiveFocus = null;
var lastPortaledElement = null;
var focusWasOutsideWindow = false;

var defaultWhitelist = function defaultWhitelist() {
  return true;
};

var focusWhitelisted = function focusWhitelisted(activeElement) {
  return (lastActiveTrap.whiteList || defaultWhitelist)(activeElement);
};

var recordPortal = function recordPortal(observerNode, portaledElement) {
  lastPortaledElement = {
    observerNode: observerNode,
    portaledElement: portaledElement,
  };
};

var focusIsPortaledPair = function focusIsPortaledPair(element) {
  return lastPortaledElement && lastPortaledElement.portaledElement === element;
};

function autoGuard(startIndex, end, step, allNodes) {
  var lastGuard = null;
  var i = startIndex;

  do {
    var item = allNodes[i];

    if (item.guard) {
      if (item.node.dataset.focusAutoGuard) {
        lastGuard = item;
      }
    } else if (item.lockItem) {
      if (i !== startIndex) {
        // we will tab to the next element
        return;
      }

      lastGuard = null;
    } else {
      break;
    }
  } while ((i += step) !== end);

  if (lastGuard) {
    lastGuard.node.tabIndex = 0;
  }
}

var extractRef$1 = function extractRef(ref) {
  return ref && "current" in ref ? ref.current : ref;
};

var focusWasOutside = function focusWasOutside(crossFrameOption) {
  if (crossFrameOption) {
    // with cross frame return true for any value
    return Boolean(focusWasOutsideWindow);
  } // in other case return only of focus went a while aho

  return focusWasOutsideWindow === "meanwhile";
};

var activateTrap = function activateTrap() {
  var result = false;

  if (lastActiveTrap) {
    var _lastActiveTrap = lastActiveTrap,
      observed = _lastActiveTrap.observed,
      persistentFocus = _lastActiveTrap.persistentFocus,
      autoFocus = _lastActiveTrap.autoFocus,
      shards = _lastActiveTrap.shards,
      crossFrame = _lastActiveTrap.crossFrame;
    var workingNode =
      observed || (lastPortaledElement && lastPortaledElement.portaledElement);
    var activeElement = document && document.activeElement;

    if (workingNode) {
      var workingArea = [workingNode].concat(
        shards.map(extractRef$1).filter(Boolean),
      );

      if (!activeElement || focusWhitelisted(activeElement)) {
        if (
          persistentFocus ||
          focusWasOutside(crossFrame) ||
          !isFreeFocus() ||
          (!lastActiveFocus && autoFocus)
        ) {
          if (
            workingNode &&
            !(focusInside(workingArea) || focusIsPortaledPair(activeElement))
          ) {
            if (document && !lastActiveFocus && activeElement && !autoFocus) {
              // Check if blur() exists, which is missing on certain elements on IE
              if (activeElement.blur) {
                activeElement.blur();
              }

              document.body.focus();
            } else {
              result = setFocus(workingArea, lastActiveFocus);
              lastPortaledElement = {};
            }
          }

          focusWasOutsideWindow = false;
          lastActiveFocus = document && document.activeElement;
        }
      }

      if (document) {
        var newActiveElement = document && document.activeElement;
        var allNodes = getFocusabledIn(workingArea);
        var focusedIndex = allNodes
          .map(function (_ref) {
            var node = _ref.node;
            return node;
          })
          .indexOf(newActiveElement);

        if (focusedIndex > -1) {
          // remove old focus
          allNodes
            .filter(function (_ref2) {
              var guard = _ref2.guard,
                node = _ref2.node;
              return guard && node.dataset.focusAutoGuard;
            })
            .forEach(function (_ref3) {
              var node = _ref3.node;
              return node.removeAttribute("tabIndex");
            });
          autoGuard(focusedIndex, allNodes.length, +1, allNodes);
          autoGuard(focusedIndex, -1, -1, allNodes);
        }
      }
    }
  }

  return result;
};

var onTrap = function onTrap(event) {
  if (activateTrap() && event) {
    // prevent scroll jump
    event.stopPropagation();
    event.preventDefault();
  }
};

var onBlur = function onBlur() {
  return deferAction(activateTrap);
};

var onFocus = function onFocus(event) {
  // detect portal
  var source = event.target;
  var currentNode = event.currentTarget;

  if (!currentNode.contains(source)) {
    recordPortal(currentNode, source);
  }
};

var FocusWatcher = function FocusWatcher() {
  return null;
};

({
  children: propTypes$1.node.isRequired,
});

var onWindowBlur = function onWindowBlur() {
  focusWasOutsideWindow = "just"; // using setTimeout to set  this variable after React/sidecar reaction

  setTimeout(function () {
    focusWasOutsideWindow = "meanwhile";
  }, 0);
};

var attachHandler = function attachHandler() {
  document.addEventListener("focusin", onTrap, true);
  document.addEventListener("focusout", onBlur);
  window.addEventListener("blur", onWindowBlur);
};

var detachHandler = function detachHandler() {
  document.removeEventListener("focusin", onTrap, true);
  document.removeEventListener("focusout", onBlur);
  window.removeEventListener("blur", onWindowBlur);
};

function reducePropsToState(propsList) {
  return propsList.filter(function (_ref5) {
    var disabled = _ref5.disabled;
    return !disabled;
  });
}

function handleStateChangeOnClient(traps) {
  var trap = traps.slice(-1)[0];

  if (trap && !lastActiveTrap) {
    attachHandler();
  }

  var lastTrap = lastActiveTrap;
  var sameTrap = lastTrap && trap && trap.id === lastTrap.id;
  lastActiveTrap = trap;

  if (lastTrap && !sameTrap) {
    lastTrap.onDeactivation(); // return focus only of last trap was removed

    if (
      !traps.filter(function (_ref6) {
        var id = _ref6.id;
        return id === lastTrap.id;
      }).length
    ) {
      // allow defer is no other trap is awaiting restore
      lastTrap.returnFocus(!trap);
    }
  }

  if (trap) {
    lastActiveFocus = null;

    if (!sameTrap || lastTrap.observed !== trap.observed) {
      trap.onActivation();
    }

    activateTrap();
    deferAction(activateTrap);
  } else {
    detachHandler();
    lastActiveFocus = null;
  }
} // bind medium

mediumFocus.assignSyncMedium(onFocus);
mediumBlur.assignMedium(onBlur);
mediumEffect.assignMedium(function (cb) {
  return cb({
    moveFocusInside: setFocus,
    focusInside: focusInside,
  });
});
var FocusTrap = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient,
)(FocusWatcher);

/* that would be a BREAKING CHANGE!
// delaying sidecar execution till the first usage
const RequireSideCar = (props) => {
  // eslint-disable-next-line global-require
  const SideCar = require('./Trap').default;
  return <SideCar {...props} />;
};
*/

var FocusLockCombination = /*#__PURE__*/ react.forwardRef(
  function FocusLockUICombination(props, ref) {
    return /*#__PURE__*/ react.createElement(
      FocusLock,
      _extends$1(
        {
          sideCar: FocusTrap,
          ref: ref,
        },
        props,
      ),
    );
  },
);

var _ref = FocusLock.propTypes || {};
_ref.sideCar;
var propTypes = _objectWithoutPropertiesLoose$1(_ref, ["sideCar"]);

FocusLockCombination.propTypes = propTypes;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
    };
  return __assign.apply(this, arguments);
};

function __rest(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]];
    }
  return t;
}

var zeroRightClassName = "right-scroll-bar-position";
var fullWidthClassName = "width-before-scroll-bar";
var noScrollbarsClassName = "with-scroll-bars-hidden";
var removedBarSizeVariable = "--removed-body-scroll-bar-size";

var effectCar = createSidecarMedium();

var nothing = function () {
  return;
};
/**
 * Removes scrollbar from the page and contain the scroll within the Lock
 */
var RemoveScroll = react.forwardRef(function (props, parentRef) {
  var ref = react.useRef(null);
  var _a = react.useState({
      onScrollCapture: nothing,
      onWheelCapture: nothing,
      onTouchMoveCapture: nothing,
    }),
    callbacks = _a[0],
    setCallbacks = _a[1];
  var forwardProps = props.forwardProps,
    children = props.children,
    className = props.className,
    removeScrollBar = props.removeScrollBar,
    enabled = props.enabled,
    shards = props.shards,
    sideCar = props.sideCar,
    noIsolation = props.noIsolation,
    inert = props.inert,
    allowPinchZoom = props.allowPinchZoom,
    _b = props.as,
    Container = _b === void 0 ? "div" : _b,
    rest = __rest(props, [
      "forwardProps",
      "children",
      "className",
      "removeScrollBar",
      "enabled",
      "shards",
      "sideCar",
      "noIsolation",
      "inert",
      "allowPinchZoom",
      "as",
    ]);
  var SideCar = sideCar;
  var containerRef = useMergeRefs([ref, parentRef]);
  var containerProps = __assign({}, rest, callbacks);
  return react.createElement(
    react.Fragment,
    null,
    enabled &&
      react.createElement(SideCar, {
        sideCar: effectCar,
        removeScrollBar: removeScrollBar,
        shards: shards,
        noIsolation: noIsolation,
        inert: inert,
        setCallbacks: setCallbacks,
        allowPinchZoom: !!allowPinchZoom,
        lockRef: ref,
      }),
    forwardProps
      ? react.cloneElement(
          react.Children.only(children),
          __assign({}, containerProps, { ref: containerRef }),
        )
      : react.createElement(
          Container,
          __assign({}, containerProps, {
            className: className,
            ref: containerRef,
          }),
          children,
        ),
  );
});
RemoveScroll.defaultProps = {
  enabled: true,
  removeScrollBar: true,
  inert: false,
};
RemoveScroll.classNames = {
  fullWidth: fullWidthClassName,
  zeroRight: zeroRightClassName,
};

var getNonce = function () {
  if (typeof __webpack_nonce__ !== "undefined") {
    return __webpack_nonce__;
  }
  return undefined;
};

function makeStyleTag() {
  if (!document) return null;
  var tag = document.createElement("style");
  tag.type = "text/css";
  var nonce = getNonce();
  if (nonce) {
    tag.setAttribute("nonce", nonce);
  }
  return tag;
}
function injectStyles(tag, css) {
  if (tag.styleSheet) {
    tag.styleSheet.cssText = css;
  } else {
    tag.appendChild(document.createTextNode(css));
  }
}
function insertStyleTag(tag) {
  var head = document.head || document.getElementsByTagName("head")[0];
  head.appendChild(tag);
}
var stylesheetSingleton = function () {
  var counter = 0;
  var stylesheet = null;
  return {
    add: function (style) {
      if (counter == 0) {
        if ((stylesheet = makeStyleTag())) {
          injectStyles(stylesheet, style);
          insertStyleTag(stylesheet);
        }
      }
      counter++;
    },
    remove: function () {
      counter--;
      if (!counter && stylesheet) {
        stylesheet.parentNode && stylesheet.parentNode.removeChild(stylesheet);
        stylesheet = null;
      }
    },
  };
};

var styleHookSingleton = function () {
  var sheet = stylesheetSingleton();
  return function (styles) {
    react.useEffect(function () {
      sheet.add(styles);
      return function () {
        sheet.remove();
      };
    }, []);
  };
};

var styleSingleton = function () {
  var useStyle = styleHookSingleton();
  var Sheet = function (_a) {
    var styles = _a.styles;
    useStyle(styles);
    return null;
  };
  return Sheet;
};

var zeroGap = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0,
};
var parse = function (x) {
  return parseInt(x || "", 10) || 0;
};
var getOffset = function (gapMode) {
  var cs = window.getComputedStyle(document.body);
  var left = cs[gapMode === "padding" ? "paddingLeft" : "marginLeft"];
  var top = cs[gapMode === "padding" ? "paddingTop" : "marginTop"];
  var right = cs[gapMode === "padding" ? "paddingRight" : "marginRight"];
  return [parse(left), parse(top), parse(right)];
};
var getGapWidth = function (gapMode) {
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  if (typeof window === "undefined") {
    return zeroGap;
  }
  var offsets = getOffset(gapMode);
  var documentWidth = document.documentElement.clientWidth;
  var windowWidth = window.innerWidth;
  return {
    left: offsets[0],
    top: offsets[1],
    right: offsets[2],
    gap: Math.max(0, windowWidth - documentWidth + offsets[2] - offsets[0]),
  };
};

var Style = styleSingleton();
var getStyles = function (_a, allowRelative, gapMode, important) {
  var left = _a.left,
    top = _a.top,
    right = _a.right,
    gap = _a.gap;
  if (gapMode === void 0) {
    gapMode = "margin";
  }
  return (
    "\n  ." +
    noScrollbarsClassName +
    " {\n   overflow: hidden " +
    important +
    ";\n   padding-right: " +
    gap +
    "px " +
    important +
    ";\n  }\n  body {\n    overflow: hidden " +
    important +
    ";\n    " +
    [
      allowRelative && "position: relative " + important + ";",
      gapMode === "margin" &&
        "\n    padding-left: " +
          left +
          "px;\n    padding-top: " +
          top +
          "px;\n    padding-right: " +
          right +
          "px;\n    margin-left:0;\n    margin-top:0;\n    margin-right: " +
          gap +
          "px " +
          important +
          ";\n    ",
      gapMode === "padding" &&
        "padding-right: " + gap + "px " + important + ";",
    ]
      .filter(Boolean)
      .join("") +
    "\n  }\n  \n  ." +
    zeroRightClassName +
    " {\n    right: " +
    gap +
    "px " +
    important +
    ";\n  }\n  \n  ." +
    fullWidthClassName +
    " {\n    margin-right: " +
    gap +
    "px " +
    important +
    ";\n  }\n  \n  ." +
    zeroRightClassName +
    " ." +
    zeroRightClassName +
    " {\n    right: 0 " +
    important +
    ";\n  }\n  \n  ." +
    fullWidthClassName +
    " ." +
    fullWidthClassName +
    " {\n    margin-right: 0 " +
    important +
    ";\n  }\n  \n  body {\n    " +
    removedBarSizeVariable +
    ": " +
    gap +
    "px;\n  }\n"
  );
};
var RemoveScrollBar = function (props) {
  var _a = react.useState(getGapWidth(props.gapMode)),
    gap = _a[0],
    setGap = _a[1];
  react.useEffect(
    function () {
      setGap(getGapWidth(props.gapMode));
    },
    [props.gapMode],
  );
  var noRelative = props.noRelative,
    noImportant = props.noImportant,
    _b = props.gapMode,
    gapMode = _b === void 0 ? "margin" : _b;
  return react.createElement(Style, {
    styles: getStyles(
      gap,
      !noRelative,
      gapMode,
      !noImportant ? "!important" : "",
    ),
  });
};

var elementCouldBeVScrolled = function (node) {
  var styles = window.getComputedStyle(node);
  return (
    styles.overflowY !== "hidden" && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowY === "visible") // scrollable
  );
};
var elementCouldBeHScrolled = function (node) {
  var styles = window.getComputedStyle(node);
  return (
    styles.overflowX !== "hidden" && // not-not-scrollable
    !(styles.overflowY === styles.overflowX && styles.overflowX === "visible") // scrollable
  );
};
var locationCouldBeScrolled = function (axis, node) {
  var current = node;
  do {
    var isScrollable = elementCouldBeScrolled(axis, current);
    if (isScrollable) {
      var _a = getScrollVariables(axis, current),
        s = _a[1],
        d = _a[2];
      if (s > d) {
        return true;
      }
    }
    current = current.parentNode;
  } while (current && current !== document.body);
  return false;
};
var getVScrollVariables = function (_a) {
  var scrollTop = _a.scrollTop,
    scrollHeight = _a.scrollHeight,
    clientHeight = _a.clientHeight;
  return [scrollTop, scrollHeight, clientHeight];
};
var getHScrollVariables = function (_a) {
  var scrollLeft = _a.scrollLeft,
    scrollWidth = _a.scrollWidth,
    clientWidth = _a.clientWidth;
  return [scrollLeft, scrollWidth, clientWidth];
};
var elementCouldBeScrolled = function (axis, node) {
  return axis === "v"
    ? elementCouldBeVScrolled(node)
    : elementCouldBeHScrolled(node);
};
var getScrollVariables = function (axis, node) {
  return axis === "v" ? getVScrollVariables(node) : getHScrollVariables(node);
};
var handleScroll = function (
  axis,
  endTarget,
  event,
  sourceDelta,
  noOverscroll,
) {
  var delta = sourceDelta;
  // find scrollable target
  var target = event.target;
  var targetInLock = endTarget.contains(target);
  var shouldCancelScroll = false;
  var isDeltaPositive = delta > 0;
  var availableScroll = 0;
  var availableScrollTop = 0;
  do {
    var _a = getScrollVariables(axis, target),
      position = _a[0],
      scroll_1 = _a[1],
      capacity = _a[2];
    var elementScroll = scroll_1 - capacity - position;
    if (position || elementScroll) {
      if (elementCouldBeScrolled(axis, target)) {
        availableScroll += elementScroll;
        availableScrollTop += position;
      }
    }
    target = target.parentNode;
  } while (
    // portaled content
    (!targetInLock && target !== document.body) ||
    // self content
    (targetInLock && (endTarget.contains(target) || endTarget === target))
  );
  if (
    isDeltaPositive &&
    ((noOverscroll && availableScroll === 0) ||
      (!noOverscroll && delta > availableScroll))
  ) {
    shouldCancelScroll = true;
  } else if (
    !isDeltaPositive &&
    ((noOverscroll && availableScrollTop === 0) ||
      (!noOverscroll && -delta > availableScrollTop))
  ) {
    shouldCancelScroll = true;
  }
  return shouldCancelScroll;
};

var passiveSupported = false;
if (typeof window !== "undefined") {
  try {
    var options = Object.defineProperty({}, "passive", {
      get: function () {
        passiveSupported = true;
        return true;
      },
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (err) {
    passiveSupported = false;
  }
}
var nonPassive = passiveSupported ? { passive: false } : false;

var getTouchXY = function (event) {
  return "changedTouches" in event
    ? [event.changedTouches[0].clientX, event.changedTouches[0].clientY]
    : [0, 0];
};
var getDeltaXY = function (event) {
  return [event.deltaX, event.deltaY];
};
var extractRef = function (ref) {
  return ref && "current" in ref ? ref.current : ref;
};
var deltaCompare = function (x, y) {
  return x[0] === y[0] && x[1] === y[1];
};
var generateStyle = function (id) {
  return (
    "\n  .block-interactivity-" +
    id +
    " {pointer-events: none;}\n  .allow-interactivity-" +
    id +
    " {pointer-events: all;}\n"
  );
};
var idCounter = 0;
var lockStack = [];
function RemoveScrollSideCar(props) {
  var shouldPreventQueue = react.useRef([]);
  var touchStartRef = react.useRef([0, 0]);
  var activeAxis = react.useRef();
  var id = react.useState(idCounter++)[0];
  var Style = react.useState(function () {
    return styleSingleton();
  })[0];
  var lastProps = react.useRef(props);
  react.useEffect(
    function () {
      lastProps.current = props;
    },
    [props],
  );
  react.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add("block-interactivity-" + id);
        var allow_1 = [props.lockRef.current]
          .concat((props.shards || []).map(extractRef))
          .filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add("allow-interactivity-" + id);
        });
        return function () {
          document.body.classList.remove("block-interactivity-" + id);
          allow_1.forEach(function (el) {
            return el.classList.remove("allow-interactivity-" + id);
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards],
  );
  var shouldCancelEvent = react.useCallback(function (event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    var touch = getTouchXY(event);
    var touchStart = touchStartRef.current;
    var deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    var deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    var currentAxis;
    var target = event.target;
    var moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    var canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target,
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target,
      );
      // other axis might be not scrollable
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      "changedTouches" in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    var cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis === "h" ? deltaX : deltaY,
      true,
    );
  }, []);
  var shouldPrevent = react.useCallback(function (_event) {
    var event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
      // not the last active
      return;
    }
    var delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    var sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        e.target === event.target &&
        deltaCompare(e.delta, delta)
      );
    })[0];
    // self event, and should be canceled
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    // outside or shard event
    if (!sourceEvent) {
      var shardNodes = (lastProps.current.shards || [])
        .map(extractRef)
        .filter(Boolean)
        .filter(function (node) {
          return node.contains(event.target);
        });
      var shouldStop =
        shardNodes.length > 0
          ? shouldCancelEvent(event, shardNodes[0])
          : !lastProps.current.noIsolation;
      if (shouldStop) {
        event.preventDefault();
      }
    }
  }, []);
  var shouldCancel = react.useCallback(function (name, delta, target, should) {
    var event = { name: name, delta: delta, target: target, should: should };
    shouldPreventQueue.current.push(event);
    setTimeout(function () {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(function (
        e,
      ) {
        return e !== event;
      });
    }, 1);
  }, []);
  var scrollTouchStart = react.useCallback(function (event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = undefined;
  }, []);
  var scrollWheel = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getDeltaXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  var scrollTouchMove = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getTouchXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  react.useEffect(function () {
    lockStack.push(Style);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove,
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function () {
      lockStack = lockStack.filter(function (inst) {
        return inst !== Style;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  var removeScrollBar = props.removeScrollBar,
    inert = props.inert;
  return react.createElement(
    react.Fragment,
    null,
    inert ? react.createElement(Style, { styles: generateStyle(id) }) : null,
    removeScrollBar
      ? react.createElement(RemoveScrollBar, { gapMode: "margin" })
      : null,
  );
}

var SideCar = exportSidecar(effectCar, RemoveScrollSideCar);

var ReactRemoveScroll = react.forwardRef(function (props, ref) {
  return react.createElement(
    RemoveScroll,
    __assign({}, props, { ref: ref, sideCar: SideCar }),
  );
});
ReactRemoveScroll.classNames = RemoveScroll.classNames;

function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var overlayPropTypes = {
  allowPinchZoom: propTypes$1.bool,
  dangerouslyBypassFocusLock: propTypes$1.bool,
  dangerouslyBypassScrollLock: propTypes$1.bool,
  // TODO:
  initialFocusRef: function initialFocusRef() {
    return null;
  },
  onDismiss: propTypes$1.func,
}; ////////////////////////////////////////////////////////////////////////////////

/**
 * DialogOverlay
 *
 * Low-level component if you need more control over the styles or rendering of
 * the dialog overlay.
 *
 * Note: You must render a `DialogContent` inside.
 *
 * @see Docs https://reach.tech/dialog#dialogoverlay
 */

var DialogOverlay = /*#__PURE__*/ forwardRefWithAs(function DialogOverlay(
  _ref,
  forwardedRef,
) {
  var _ref$as = _ref.as,
    Comp = _ref$as === void 0 ? "div" : _ref$as,
    _ref$isOpen = _ref.isOpen,
    isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
    props = _objectWithoutPropertiesLoose(_ref, ["as", "isOpen"]);

  useCheckStyles("dialog"); // We want to ignore the immediate focus of a tooltip so it doesn't pop
  // up again when the menu closes, only pops up when focus returns again
  // to the tooltip (like native OS tooltips).

  react.useEffect(
    function () {
      if (isOpen) {
        // @ts-ignore
        window.__REACH_DISABLE_TOOLTIPS = true;
      } else {
        window.requestAnimationFrame(function () {
          // Wait a frame so that this doesn't fire before tooltip does
          // @ts-ignore
          window.__REACH_DISABLE_TOOLTIPS = false;
        });
      }
    },
    [isOpen],
  );
  return isOpen
    ? /*#__PURE__*/ react.createElement(
        Portal,
        {
          "data-reach-dialog-wrapper": "",
        },
        /*#__PURE__*/ react.createElement(
          DialogInner,
          _extends(
            {
              ref: forwardedRef,
              as: Comp,
            },
            props,
          ),
        ),
      )
    : null;
});

{
  DialogOverlay.displayName = "DialogOverlay";
  DialogOverlay.propTypes = /*#__PURE__*/ _extends({}, overlayPropTypes, {
    isOpen: propTypes$1.bool,
  });
}

////////////////////////////////////////////////////////////////////////////////

/**
 * DialogInner
 */
var DialogInner = /*#__PURE__*/ forwardRefWithAs(function DialogInner(
  _ref2,
  forwardedRef,
) {
  var allowPinchZoom = _ref2.allowPinchZoom,
    _ref2$as = _ref2.as,
    Comp = _ref2$as === void 0 ? "div" : _ref2$as,
    _ref2$dangerouslyBypa = _ref2.dangerouslyBypassFocusLock,
    dangerouslyBypassFocusLock =
      _ref2$dangerouslyBypa === void 0 ? false : _ref2$dangerouslyBypa,
    _ref2$dangerouslyBypa2 = _ref2.dangerouslyBypassScrollLock,
    dangerouslyBypassScrollLock =
      _ref2$dangerouslyBypa2 === void 0 ? false : _ref2$dangerouslyBypa2,
    initialFocusRef = _ref2.initialFocusRef,
    onClick = _ref2.onClick,
    _ref2$onDismiss = _ref2.onDismiss,
    onDismiss = _ref2$onDismiss === void 0 ? noop : _ref2$onDismiss,
    onKeyDown = _ref2.onKeyDown,
    onMouseDown = _ref2.onMouseDown,
    _ref2$unstable_lockFo = _ref2.unstable_lockFocusAcrossFrames,
    unstable_lockFocusAcrossFrames =
      _ref2$unstable_lockFo === void 0 ? true : _ref2$unstable_lockFo,
    props = _objectWithoutPropertiesLoose(_ref2, [
      "allowPinchZoom",
      "as",
      "dangerouslyBypassFocusLock",
      "dangerouslyBypassScrollLock",
      "initialFocusRef",
      "onClick",
      "onDismiss",
      "onKeyDown",
      "onMouseDown",
      "unstable_lockFocusAcrossFrames",
    ]);

  var mouseDownTarget = react.useRef(null);
  var overlayNode = react.useRef(null);
  var ref = useForkedRef(overlayNode, forwardedRef);
  var activateFocusLock = react.useCallback(
    function () {
      if (initialFocusRef && initialFocusRef.current) {
        initialFocusRef.current.focus();
      }
    },
    [initialFocusRef],
  );

  function handleClick(event) {
    if (mouseDownTarget.current === event.target) {
      event.stopPropagation();
      onDismiss(event);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      event.stopPropagation();
      onDismiss(event);
    }
  }

  function handleMouseDown(event) {
    mouseDownTarget.current = event.target;
  }

  react.useEffect(function () {
    return overlayNode.current
      ? createAriaHider(overlayNode.current)
      : void null;
  }, []);
  return /*#__PURE__*/ react.createElement(
    FocusLockCombination,
    {
      autoFocus: true,
      returnFocus: true,
      onActivation: activateFocusLock,
      disabled: dangerouslyBypassFocusLock,
      crossFrame: unstable_lockFocusAcrossFrames,
    },
    /*#__PURE__*/ react.createElement(
      ReactRemoveScroll,
      {
        allowPinchZoom: allowPinchZoom,
        enabled: !dangerouslyBypassScrollLock,
      },
      /*#__PURE__*/ react.createElement(
        Comp,
        _extends({}, props, {
          ref: ref,
          "data-reach-dialog-overlay": "",
          /*
           * We can ignore the `no-static-element-interactions` warning here
           * because our overlay is only designed to capture any outside
           * clicks, not to serve as a clickable element itself.
           */
          onClick: wrapEvent(onClick, handleClick),
          onKeyDown: wrapEvent(onKeyDown, handleKeyDown),
          onMouseDown: wrapEvent(onMouseDown, handleMouseDown),
        }),
      ),
    ),
  );
});

{
  DialogOverlay.displayName = "DialogOverlay";
  DialogOverlay.propTypes = /*#__PURE__*/ _extends({}, overlayPropTypes);
} ////////////////////////////////////////////////////////////////////////////////

/**
 * DialogContent
 *
 * Low-level component if you need more control over the styles or rendering of
 * the dialog content.
 *
 * Note: Must be a child of `DialogOverlay`.
 *
 * Note: You only need to use this when you are also styling `DialogOverlay`,
 * otherwise you can use the high-level `Dialog` component and pass the props
 * to it. Any props passed to `Dialog` component (besides `isOpen` and
 * `onDismiss`) will be spread onto `DialogContent`.
 *
 * @see Docs https://reach.tech/dialog#dialogcontent
 */

var DialogContent = /*#__PURE__*/ forwardRefWithAs(function DialogContent(
  _ref3,
  forwardedRef,
) {
  var _ref3$as = _ref3.as,
    Comp = _ref3$as === void 0 ? "div" : _ref3$as,
    onClick = _ref3.onClick;
  _ref3.onKeyDown;
  var props = _objectWithoutPropertiesLoose(_ref3, [
    "as",
    "onClick",
    "onKeyDown",
  ]);

  return /*#__PURE__*/ react.createElement(
    Comp,
    _extends(
      {
        "aria-modal": "true",
        role: "dialog",
        tabIndex: -1,
      },
      props,
      {
        ref: forwardedRef,
        "data-reach-dialog-content": "",
        onClick: wrapEvent(onClick, function (event) {
          event.stopPropagation();
        }),
      },
    ),
  );
});
/**
 * @see Docs https://reach.tech/dialog#dialogcontent-props
 */

{
  DialogContent.displayName = "DialogContent";
  DialogContent.propTypes = {
    "aria-label": ariaLabelType,
    "aria-labelledby": ariaLabelType,
  };
} ////////////////////////////////////////////////////////////////////////////////

/**
 * Dialog
 *
 * High-level component to render a modal dialog window over the top of the page
 * (or another dialog).
 *
 * @see Docs https://reach.tech/dialog#dialog
 */

/** @type {any} */
var Dialog = /*#__PURE__*/ forwardRefWithAs(function Dialog(
  _ref4,
  forwardedRef,
) {
  var _ref4$allowPinchZoom = _ref4.allowPinchZoom,
    allowPinchZoom =
      _ref4$allowPinchZoom === void 0 ? false : _ref4$allowPinchZoom,
    initialFocusRef = _ref4.initialFocusRef,
    isOpen = _ref4.isOpen,
    _ref4$onDismiss = _ref4.onDismiss,
    onDismiss = _ref4$onDismiss === void 0 ? noop : _ref4$onDismiss,
    props = _objectWithoutPropertiesLoose(_ref4, [
      "allowPinchZoom",
      "initialFocusRef",
      "isOpen",
      "onDismiss",
    ]);

  return /*#__PURE__*/ react.createElement(
    DialogOverlay,
    {
      allowPinchZoom: allowPinchZoom,
      initialFocusRef: initialFocusRef,
      isOpen: isOpen,
      onDismiss: onDismiss,
    },
    /*#__PURE__*/ react.createElement(
      DialogContent,
      _extends(
        {
          ref: forwardedRef,
        },
        props,
      ),
    ),
  );
});
/**
 * @see Docs https://reach.tech/dialog#dialog-props
 */

{
  Dialog.displayName = "Dialog";
  Dialog.propTypes = {
    isOpen: propTypes$1.bool,
    onDismiss: propTypes$1.func,
    "aria-label": ariaLabelType,
    "aria-labelledby": ariaLabelType,
  };
} ////////////////////////////////////////////////////////////////////////////////

function createAriaHider(dialogNode) {
  var originalValues = [];
  var rootNodes = [];
  var ownerDocument = getOwnerDocument(dialogNode);

  if (!dialogNode) {
    {
      console.warn(
        "A ref has not yet been attached to a dialog node when attempting to call `createAriaHider`.",
      );
    }

    return noop;
  }

  Array.prototype.forEach.call(
    ownerDocument.querySelectorAll("body > *"),
    function (node) {
      var _dialogNode$parentNod, _dialogNode$parentNod2;

      var portalNode =
        (_dialogNode$parentNod = dialogNode.parentNode) == null
          ? void 0
          : (_dialogNode$parentNod2 = _dialogNode$parentNod.parentNode) == null
          ? void 0
          : _dialogNode$parentNod2.parentNode;

      if (node === portalNode) {
        return;
      }

      var attr = node.getAttribute("aria-hidden");
      var alreadyHidden = attr !== null && attr !== "false";

      if (alreadyHidden) {
        return;
      }

      originalValues.push(attr);
      rootNodes.push(node);
      node.setAttribute("aria-hidden", "true");
    },
  );
  return function () {
    rootNodes.forEach(function (node, index) {
      var originalValue = originalValues[index];

      if (originalValue === null) {
        node.removeAttribute("aria-hidden");
      } else {
        node.setAttribute("aria-hidden", originalValue);
      }
    });
  };
}

function ariaLabelType(props, propName, compName, location, propFullName) {
  var details = "\nSee https://www.w3.org/TR/wai-aria/#aria-label for details.";

  if (!props["aria-label"] && !props["aria-labelledby"]) {
    return new Error(
      "A <" +
        compName +
        "> must have either an `aria-label` or `aria-labelledby` prop.\n      " +
        details,
    );
  }

  if (props["aria-label"] && props["aria-labelledby"]) {
    return new Error(
      "You provided both `aria-label` and `aria-labelledby` props to a <" +
        compName +
        ">. If the a label for this component is visible on the screen, that label's component should be given a unique ID prop, and that ID should be passed as the `aria-labelledby` prop into <" +
        compName +
        ">. If the label cannot be determined programmatically from the content of the element, an alternative label should be provided as the `aria-label` prop, which will be used as an `aria-label` on the HTML tag." +
        details,
    );
  } else if (props[propName] != null && !isString(props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to `" +
        compName +
        "`. Expected `string`, received `" +
        (Array.isArray(propFullName) ? "array" : typeof propFullName) +
        "`.",
    );
  }

  return null;
} ////////////////////////////////////////////////////////////////////////////////

export default Dialog;
export { Dialog, DialogContent, DialogOverlay };
