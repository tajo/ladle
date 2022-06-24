---
id: setup
title: Setup
---

Ladle is a single package & command that does not require any initial configuration. It is made to be quickly deployable even into complex monorepo setups.

## Dependencies

```bash
# pnpm
pnpm add @ladle/react

# npm
npm install @ladle/react

# yarn
yarn add @ladle/react
```

It expects that `react` and `react-dom` are already installed.

## Add a story

Ladle looks for all stories matching the glob `src/**/*.stories.{js,jsx,ts,tsx}`.

Let's create our first story: `src/hello.stories.tsx`:

```jsx
export const World = () => <p>Hey!</p>;
```

If you use `.js` for your React components (JSX), you have to import React explicitly:

```jsx
import * as React from "react";
```

## Run and develop

```bash
pnpm ladle serve
```

Development mode. It will start a dev server and opens your browser. This is ideal when you want to quickly develop your components.

## Build

```bash
pnpm ladle build
```

Production build. It creates a `build` folder and outputs Ladle assets into it. This is optimized and minified version that you can deploy or use for testing.

You need to serve it through a http server. Ladle has the `preview` command you can use.

```bash
pnpm ladle preview
```

## All-in-one

This is a full set of commands you can follow to get a basic setup from scratch:

```bash
mkdir my-ladle
cd my-ladle
pnpm init
pnpm add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
pnpm ladle serve
```

or with yarn

```bash
mkdir my-ladle
cd my-ladle
yarn init --yes
yarn add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
yarn ladle serve
```

or with npm

```bash
mkdir my-ladle
cd my-ladle
npm init --yes
npm install @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
npx ladle serve
```

## StackBlitz

You can also try ladle in your browser through our StackBlitz [template](https://node.new/ladle).
