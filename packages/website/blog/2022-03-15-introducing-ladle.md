---
slug: introducing-ladle
title: Introducing Ladle
author: Vojtech Miksu
author_title: Developer Platform, Uber
author_url: https://twitter.com/vmiksu
author_image_url: https://miksu.cz/images/profile.jpg
tags: [ladle, storybook, react, testing, components]
---

Ladle is a tool for developing and testing your React components in an environment that's isolated and faster than most real-world applications. It supports [Component Story Format](https://storybook.js.org/docs/react/api/csf) – a concept widely popular thanks to [Storybook](https://storybook.js.org/). In fact, **Ladle has been developed as a drop-in replacement of Storybook** – it should already work with your existing stories.

![Ladel Demo](/img/ladle-baseweb.png)

## Storybook ❤️

At Uber, we are big fans of Storybook. We have over 100 instances of Storybook in our web monorepo. Our teams use it to develop, showcase, document and test React components. We have developed a CI based system that automatically deploys each Storybook with every change and runs automated visual snapshot tests. This happens a thousand times each day. It's a critical tool for our web workflows. The performance is extremely important.

Unfortunately, there are some areas where Storybook is not doing as good as we would like to:

- **production build time** - often times it's the slowest part of our CI
- **dev mode start up time** - not always faster than the related prod app
- **bundle output** - hosting storage + slow initial time to interactive
- **maintenance** - we repackaged Storybook, its dependencies and configuration to provide a seamless setup for our developers; however, the addon versioning and monorepo setup makes maintenance difficult
- **testing** - for our automated visual testing, we need to crawl and parse stories in a separate process since Storybook doesn't export a static list of stories (and other metadata)

## Next Generation Frontend Tooling ⚡

A shift is happening. ES modules are now natively supported by all browsers and Node. We don't need to bundle our components anymore in order to serve them. This is a major slowdown for Storybook and other Webpack based environments.

Ladle is built around [Vite](https://vitejs.dev/), which serves modules directly to the browser and uses fast [esbuild](https://esbuild.github.io/) when bundling is required for dependencies. It provides the performance leap we were looking for.

## Performance Numbers ⏱️

We used [Base Web](https://baseweb.design/) to benchmark Ladle and latest Storybook v6.4.19. Base Web is a complex component library and has about 350 stories. The Storybook uses the default bootstrapped settings. The test is made on a 2018 Macbook Pro, i7 2.7 GHz. The time is measured in seconds and less is better.

![BaseWeb stories compilation time](/img/compilation-time.svg)

Both Ladle and Storybook utilize cache. The initial dev startup takes **6s vs 58s**. Once the cache is built, Ladle starts almost instantly (3s is just the browser tab being opened + time to interactive). Storybook always takes about 25s to start. The production build is about **4x faster** with Ladle.

There is another improvement - **hot reload takes less than 100ms with Ladle** and preserves the state. Storybook takes about **2.5s** and doesn't preserve the state.

We also care about the bundle size and the amount of resources that browser has to initially download:

- Ladle build folder is **4.6 MB vs Storybook's 16.1 MB**
- Ladle downloads **388 kB** of resources to open the default story, Storybook **14.3 MB**

How is this even possible? Ladle code-splits each story by default, so it doesn't matter how many stories you have. It always keeps the initial bundle reasonable.

## Not Just Fast 📝

Ladle is a single package and command. It's easy to install and setup - no configuration required. Some other features:

- Supports controls, links, dark theme, RTL and preview mode
- Built-in addons always preserve the state through the URL - useful for testing
- A11y and keyboard friendly
- Responsive, no iframes
- Code-splitting and React Fast Refresh enabled by default
- Exports [`meta.json`](/docs/meta/) file with list of stories and additional metadata
- [Programmatic API](/docs/programmatic) so it can be easily repackaged

## Conclusion 🔮

The new set of web tools is coming and brings huge performance wins. Ladle is using them to provide a significantly faster environment for developing, sharing and testing your React components. Are you ready to [give it a try](/docs/setup)? Also, check our [GitHub](https://github.com/tajo/ladle) and give us ⭐.

```bash
mkdir my-ladle
cd my-ladle
pnpm init
pnpm add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
pnpm ladle serve
```
