---
"@ladle/react": major
---

Upgrade to Vite5, MSW2, MDX3 and all other deps as well.

**BREAKING changes**

- The biggest breaking change is upgrading [MSW](https://mswjs.io/) to v2. Ladle ships its [own copy of msw](https://ladle.dev/docs/msw/). You will need to update your existing MSW handlers. There are [codemods and migration gudie](https://mswjs.io/docs/migrations/1.x-to-2.x) that should ease the transition. If you don't use this addon, you can ignore this.
- Ladle v3 has already dropped support for older Node versions. However, there are more Ladle v4 dependencies following the suit (including Vite) to support only Node v18+. So now it's really time to upgrade your Node.
- Vite v5 should not really break anything for you unless you were using some more exotic rollup plugins. Check Vite 4 to Vite 5 [migration guide](https://vitejs.dev/guide/migration) if you run into any issues.
