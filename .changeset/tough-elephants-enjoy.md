---
"@ladle/react": patch
---

Fix: Export default title and meta params. They were not correctly applied before. This might change the story IDs (URLs and the sidebar labels) if you were using them before.
