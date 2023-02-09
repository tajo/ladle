# test-page

React uOwn Tree Datarich component

<img alt="Screenshot" src="https://ladle.dev/img/ladle-baseweb.png" />

---

## Install

```
$ jz add @test/react-test
```

## Usage

### Test

Stateful version of the component. It does requests to the uOwn backend and controls state of the tree.

```
yarn add-service
```

- Now you are ready to add react component

```js
import { Test } from "test/react";
```

```jsx
<Test
  onNodeChange={({ name, uuid }) => console.log(`Node selected ${name}`)}
  maxWidth="100%"
/>
```

#### Props

- `uuid?`: string
- `onNodeChange?`: callback function, invokes when changing active node, passes object: `{uuid, name}`

## Developing

Clone this project:

```
$ git clone gitolite@code.test
```

Go to the component folder: `src/test`

Install the dependencies via `yarn`:

```
$ yarn install
```

## Ownership

This template is authored by Santa Claus.
