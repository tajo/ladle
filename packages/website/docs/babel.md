---
id: babel
title: Babel
---

Ladle uses [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) by default. This plugin uses [SWC](https://swc.rs/) to transform all React code and is many times faster than Babel.

If you want to use [Babel](https://babeljs.io/) instead of SWC (in case you need to apply some custom babel plugins), you can do it by installing and adding [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) into `./vite.config.js`:

```js title="vite.config.js"
import react from "@vitejs/plugin-react";

export default {
  plugins: [react()],
};
```

Ladle automatically disables the default SWC plugin.

SWC is up to 20x faster than Babel and can supercharge your development experience. The only downside is that you can't utilize a rich ecosystem of Babel plugins if your project uses a special syntax. However, there are also a few SWC [plugins](https://github.com/swc-project/plugins) and there is a [plugin API](https://swc.rs/docs/plugin/ecmascript/getting-started) so you can write your own.
