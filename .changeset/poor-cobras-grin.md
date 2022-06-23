---
"@ladle/react": patch
---

Enforce that Node version >= v16.0.0. This causes a loud failure when installing ladle with an old version of Node, as opposed to silently failing and causing difficult-to-diagnose bugs.
