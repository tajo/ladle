---
"@ladle/react": patch
---

Fix story file watching for add/remove detection with chokidar v4

Chokidar v4 no longer supports glob patterns directly, so the watcher now:

- Extracts base directories from glob patterns using `getGlobBasePath`
- Filters story files using `STORY_FILE_REGEX` in the `ignored` callback
- Properly handles the case where `stats` is undefined during initial directory checks

This fix ensures that adding or removing story files triggers a full reload as expected.
