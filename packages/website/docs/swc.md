---
id: swc
title: SWC
---

Ladle uses [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react) by default. This plugin uses [Babel](https://babeljs.io/) to transform all React code.

If you want to use [SWC](https://swc.rs/) instead of Babel, you can do it by installing and adding [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) into `./vite.config.js`:

```js
import react from "@vitejs/plugin-react-swc";

export default {
  plugins: [react()],
};
```

Ladle automatically disables the Babel plugin.

SWC is up to 20x faster than Babel and can supercharge your development experience. The only downside is that you can't utilize a rich ecosystem of Babel plugins if your project uses a special syntax.
