# controls.stories.Controls

- **Type:** function
- **Language:** typescript
- **File:** `\e2e\addons\src\controls.stories.tsx` (lines 29-47)
- **Role:** internal
- **Stability:** unknown

## Signature

```
({
  count,
  disabled,
  label,
  colors,
  variant,
  size,
  range,
  airports,
  cities,
  mountain,
  snowing,
  inches,
  color,
  date,
}) => (
  <div id="content">
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"
```

## Docstring

_No docstring provided._

## Source

```
export const Controls: Story<Props> = ({
  count,
  disabled,
  label,
  colors,
  variant,
  size,
  range,
  airports,
  cities,
  mountain,
  snowing,
  inches,
  color,
  date,
}) => (
  <div id="content">
    <p>Count: {count}</p>
    <p>Disabled: {disabled ? "yes" : "no"}</p>
```

## Git History

- Commits: 12
- Authors: 4
- Bug fixes: 1
- Features: 6

## Callers

None

## Callees

None
