---
"@ladle/react": patch
---

fix(parse): unwrap `TSSatisfiesExpression` / `TSAsExpression` in named-identifier default-export init

Ladle's `getDefaultExport` walker handles `TSSatisfiesExpression` / `TSAsExpression` when the _direct declaration_ is wrapped, e.g. `export default { … } satisfies Meta<…>;`. It did not unwrap the same expression when it appears as the **init** of a named identifier that is then re-exported by name:

```ts
const meta = {
  title: "Components/Button",
  component: Button,
} satisfies Meta<typeof Button>;
export default meta;
```

`objNode` ended up pointing at the `TSSatisfiesExpression` rather than the underlying `ObjectExpression`. The subsequent `objNode.properties.forEach` iterated over an empty array (the satisfies node has no `.properties`), so the `title` and `meta` fields silently never reached the result, and story files using this pattern were dropped from the index entirely.

Mirrors the existing direct-declaration unwrap pattern. Adds two new unit tests covering `satisfies` and `as` in this position.
