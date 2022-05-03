# Ladle

Ladle is an environment to develop, test and share your React components faster.

- [Documentation](https://www.ladle.dev)
- [Demo](https://baseweb.design/ladle)
- [StackBlitz](https://node.new/ladle)
- [Discord](https://discord.gg/H6FSHjyW7e)

![Ladle BaseWeb](https://raw.githubusercontent.com/tajo/ladle/master/packages/website/static/img/ladle-baseweb.png)

## Quick start

```bash
mkdir my-ladle
cd my-ladle
pnpm init
pnpm add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
pnpm ladle serve
```

with yarn

```bash
mkdir my-ladle
cd my-ladle
yarn init --yes
yarn add @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
yarn ladle serve
```

with npm

```bash
mkdir my-ladle
cd my-ladle
npm init --yes
npm install @ladle/react react react-dom
mkdir src
echo "export const World = () => <p>Hey</p>;" > src/hello.stories.tsx
npx ladle serve
```
