export const storyDelimiter = "-";
export const storyEncodeDelimiter = "$";

export const getFileId = (filename: string) => {
  const pathParts = filename.split("/");
  return pathParts[pathParts.length - 1].split(".")[0];
};

export const getEncodedStoryName = (fileId: string, namedExport: string) => {
  return `${fileId}${storyEncodeDelimiter}${storyEncodeDelimiter}${namedExport}`
    .toLocaleLowerCase()
    .replace(new RegExp(storyDelimiter, "g"), storyEncodeDelimiter);
};
