---
"@ladle/react": patch
---

Error out when story named export has \_\_. We use it to encode sublevels internally and this would break the sidebar navigation.
