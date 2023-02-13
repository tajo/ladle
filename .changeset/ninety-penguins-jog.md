---
"@ladle/react": patch
---

Change the way how values from config.mjs are passed to the client. We were doing direct import into the app but that breaks cases when config.mjs uses Node APIs. Also, it risks leaking potentially sensitive stuff from the CLI side. And it's cubersome when used through programatic API / wrapper libraries. The new solution picks just a subset of config.mjs values that are really needed in the client, serializes them and embeds them into our virtual module.
