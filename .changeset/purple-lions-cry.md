---
"@ladle/react": patch
---

Find a free port for HMR server. Before, if there were multiple instances of Ladle, the client would always connect to the initial HMR server and reloads didn't work.
