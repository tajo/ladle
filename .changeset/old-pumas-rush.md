---
"@ladle/react": patch
---

Improve the performance of virtual stories modules. fs.promises.readFile much slower than fs.promises.readSync and it blocking CPU doesn't matter in our use case anyway. Also don't run the story watcher on the startup.
