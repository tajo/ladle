# decorators.test.decoratorWithValidProps

- **Type:** function
- **Language:** typescript
- **File:** `\type-tests\decorators.test.tsx` (lines 22-26)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(Component) => (
  <div>
    <Component foo="foo" />
  </div>
)
```

## Docstring

_No docstring provided._

## Source

```
const decoratorWithValidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component foo="foo" />
  </div>
);
```

## Git History

- Commits: 1
- Authors: 1
- Bug fixes: 1
- Features: 1

## Callers

None

## Callees

None
