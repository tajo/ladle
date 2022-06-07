// copied from https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts

function arraify(target) {
  return Array.isArray(target) ? target : [target];
}

function isObject(value) {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function mergeConfigRecursively(defaults, overrides, rootPath) {
  const merged = { ...defaults };
  for (const key in overrides) {
    const value = overrides[key];
    if (value == null) {
      continue;
    }
    const existing = merged[key];
    if (existing == null) {
      merged[key] = value;
      continue;
    }
    if (Array.isArray(existing) || Array.isArray(value)) {
      merged[key] = [...arraify(existing ?? []), ...arraify(value ?? [])];
      continue;
    }
    if (isObject(existing) && isObject(value)) {
      merged[key] = mergeConfigRecursively(
        existing,
        value,
        rootPath ? `${rootPath}.${key}` : key,
      );
      continue;
    }

    merged[key] = value;
  }
  return merged;
}

export default function mergeConfig(defaults, overrides, isRoot = true) {
  return mergeConfigRecursively(defaults, overrides, isRoot ? "" : ".");
}
