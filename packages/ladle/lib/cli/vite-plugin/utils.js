// needed for unit tests to remove local specific paths from snapshots
export const IMPORT_ROOT = process.env.IMPORT_ROOT || process.cwd();

/**
 * @param message {string}
 */
export const printError = (message) => console.error("\x1b[31m%s", message);

/**
 * @param entryData {import('../../shared/types').EntryData}
 */
export const detectDuplicateStoryNames = (entryData) => {
  /** @type {{[key: string]: [string, string]}} */
  const stories = {};
  Object.keys(entryData).forEach((entry) => {
    entryData[entry].stories.forEach((story) => {
      if (stories.hasOwnProperty(story.storyId)) {
        throw Error(
          `
There are two stories with the same ID ${story.storyId} as a result
of normalized file name and story name combination.

  - ${entry}: ${story.namedExport}
  - ${stories[story.storyId][0]}: ${stories[story.storyId][1]}

Story IDs need to be unique.
`,
        );
      } else {
        stories[story.storyId] = [entry, story.namedExport];
      }
    });
  });
};
