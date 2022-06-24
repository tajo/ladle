import fs from "fs";
import path from "path";

/**
 *
 * @param {string} dirPath
 * @param {string[]} arrayOfFiles
 * @returns
 */
const getAllFiles = function (dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach(function (file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
};

/**
 *
 * @param {string} directoryPath
 * @returns
 */
const getFolderSize = function (directoryPath) {
  const arrayOfFiles = getAllFiles(directoryPath);

  let totalSize = 0;

  arrayOfFiles.forEach(function (filePath) {
    totalSize += fs.statSync(filePath).size;
  });

  return Number(totalSize / 1024 / 1024).toFixed(2);
};

export default getFolderSize;
