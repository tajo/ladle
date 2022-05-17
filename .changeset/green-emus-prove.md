---
"@ladle/react": patch
---

Force page reload for stories that are defined through .bind({}) syntax (controls). It seems that react-refresh can't detect those when creating boundaries.
