import chokidar from "chokidar";
import picomatch from "picomatch";

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
  const baseDirs = [
    ...new Set(patterns.map((p) => picomatch.scan(p).base || ".")),
  ];
  const isMatch = picomatch(patterns);

  return chokidar.watch(baseDirs, {
    persistent: true,
    ignoreInitial: true,
    ignored: (filePath, stats) => {
      // Don't ignore directories - we need to traverse into them
      // In chokidar v4, stats can be undefined for initial directory checks
      if (stats === undefined || stats?.isDirectory()) return false;
      // Only watch files matching the user's configured story patterns
      return !isMatch(filePath);
    },
    ...options,
  });
};
