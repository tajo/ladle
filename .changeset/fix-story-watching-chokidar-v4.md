---
"@ladle/react": patch
---

Fix story file watching for add/remove detection with chokidar v4

Chokidar v4 no longer supports glob patterns directly, so the watcher now uses picomatch to:

- Extract base directories from glob patterns using `picomatch.scan()`
- Filter files using the user's configured story patterns (respects custom patterns)
- Properly handle the case where `stats` is undefined during initial directory checks

This fix ensures that adding or removing story files triggers a full reload as expected.
