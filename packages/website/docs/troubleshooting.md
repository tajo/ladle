---
id: troubleshooting
title: Troubleshooting
---

If you run into problems, try to enable verbose output:

```bash
DEBUG=ladle* pnpm ladle serve
DEBUG=ladle* pnpm ladle build
```

You can also enable verbose output in the browser console by adding an item into local storage `debug: ladle*` where `debug` is the key and `ladle*` the value. In Chrome, you can do that by opening the dev tools and insert this into the console:

```
localStorage.debug = 'ladle*'
```

## Create Issue

You can also search [existing issues](https://github.com/tajo/ladle/issues) or add a new one.

## Discord

Join our [community](https://discord.gg/H6FSHjyW7e).

## ES Modules

Ladle embraces ES Modules and is implemented as an ES module. That requires `Node 20+` and environment that fully supports ESM.
