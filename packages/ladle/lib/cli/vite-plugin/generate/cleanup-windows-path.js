/**
 * @param {string} path
 * @return {string}
 */
function cleanupWindowsPath(path) {
  return path.replace(/\\/g, "/");
}

export default cleanupWindowsPath;
