# Ladle

Ladle is an environment to develop, test and share your React components faster.

- [Documentation](https://www.ladle.dev)
- [Demo](https://baseweb.netlify.app)

## Quick start

```sh
yarn add @ladle/react
yarn ladle serve #dev environemnt
yarn ladle build --optimize #build
```

assuming you have an existing story and `react`, `react-dom` installed

`src/hello.stories.tsx`:

```jsx
export const Button = () => <button>Hello</button>;
```
