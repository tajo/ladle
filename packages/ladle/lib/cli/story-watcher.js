import chokidar from "chokidar";

/**
 * Extract the base directory from a glob pattern.
 * e.g., "src/**\/*.stories.tsx" -> "src"
 * @param {string} pattern
 * @returns {string}
 */
export const getGlobBasePath = (pattern) => {
  // Normalise path separators to forward slashes for cross-platform compatibility
  const normalised = pattern.replace(/\\/g, "/");
  const parts = normalised.split("/");
  const baseParts = [];
  for (const part of parts) {
    if (part.includes("*") || part.includes("{") || part.includes("[")) break;
    baseParts.push(part);
  }
  return baseParts.length > 0 ? baseParts.join("/") : ".";
};

// Story file pattern - matches .stories.{js,jsx,ts,tsx,mdx}
export const STORY_FILE_REGEX = /\.stories\.(js|jsx|ts|tsx|mdx)$/;

/**
 * Creates a chokidar watcher configured to watch story files.
 * @param {string | string[]} storyPatterns - Glob pattern(s) for stories
 * @param {object} options - Optional chokidar options override
 * @returns {import("chokidar").FSWatcher}
 */
export const createStoryWatcher = (storyPatterns, options = {}) => {
  const patterns = Array.isArray(storyPatterns)
    ? storyPatterns
    : [storyPatterns];
  const baseDirs = [...new Set(patterns.map(getGlobBasePath))];

  return chokidar.watch(baseDirs, {
    persistent: true,
    ignoreInitial: true,
    ignored: (filePath, stats) => {
      // Don't ignore directories - we need to traverse into them
      // In chokidar v4, stats can be undefined for initial directory checks
      if (stats === undefined || stats?.isDirectory()) return false;
      // Only watch story files
      return !STORY_FILE_REGEX.test(filePath);
    },
    ...options,
  });
};
