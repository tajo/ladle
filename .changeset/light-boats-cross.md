---
"@ladle/react": major
---

Upgrade to Vite 3. It should not be really a big breaking change for Ladle but we expose the whole `vite.config.js` so you might run into some deprecations. [Read more](https://vitejs.dev/blog/announcing-vite3.html) to see if this could impact you.

Vite 3 also ships as ESM module. That forces us to stop distributing `@ladle/react-cjs`. We used it for our internal yarn pnp setup but we don't need it anymore. Pure ESM everywhere!
