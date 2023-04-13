---
"@ladle/react": patch
---

Recent react-frame-component version bump causes iframe content to glitch - it sometimes doesn't load. It seems they switched some waiting logic. Pinning this dependency to 5.2.4 - the latest working version for now.
