// copied from https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts

//@ts-ignore
function arraify(target) {
  return Array.isArray(target) ? target : [target];
}

//@ts-ignore
function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

/**
 *
 * @param {import('vite').UserConfig} defaults
 * @param {import('vite').UserConfig} overrides
 * @param {string} rootPath
 * @returns
 */
function mergeConfigRecursively(defaults, overrides, rootPath) {
  /** @type import('vite').UserConfig */
  const merged = { ...defaults };
  for (const key in overrides) {
    //@ts-ignore
    const value = overrides[key];
    if (value == null) {
      continue;
    }
    //@ts-ignore
    const existing = merged[key];
    if (existing == null) {
      //@ts-ignore
      merged[key] = value;
      continue;
    }
    if (Array.isArray(existing) || Array.isArray(value)) {
      //@ts-ignore
      merged[key] = [...arraify(existing ?? []), ...arraify(value ?? [])];
      continue;
    }
    if (isObject(existing) && isObject(value)) {
      //@ts-ignore
      merged[key] = mergeConfigRecursively(
        existing,
        value,
        rootPath ? `${rootPath}.${key}` : key,
      );
      continue;
    }
    //@ts-ignore
    merged[key] = value;
  }
  return merged;
}

/**
 *
 * @param {import('vite').UserConfig} defaults
 * @param {import('vite').UserConfig} overrides
 * @param {boolean} isRoot
 * @returns
 */
export default function mergeConfig(defaults, overrides, isRoot = true) {
  return mergeConfigRecursively(defaults, overrides, isRoot ? "" : ".");
}
