---
id: setup
title: Setup
---

Ladle is a single package & command that does not require any initial configuration. It is made to be quickly deployable even into complex monorepo setups.

## Dependencies

```bash
yarn add @ladle/react
```

It expects that `react` and `react-dom` are already installed.

## Add a story

Ladle looks for all stories matching the glob `src/**/*.stories.{js,jsx,ts,tsx}`.

Let's create our first story: `src/hello.stories.tsx`:

```jsx
export const World = () => <p>Hey!</p>;
```

## Run and develop

```bash
yarn ladle serve
```

Development mode. It will start a dev server and opens your browser. This is ideal when you want to quickly develop your components.

## Build

```bash
yarn ladle build
```

Production build. It creates a `build` folder and outputs Ladle assets into it. This is optimized and minified version that you can deploy or use for testing.

You need to serve it through a http server. For example, you can use a simple python command:

```bash
cd build && python -m SimpleHTTPServer 8000
```

## All-in-one

This is a full set of commands you can follow to get a basic setup from scratch:

```bash
mkdir my-ladle
cd my-ladle
yarn init --yes
yarn add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
yarn ladle serve
```
