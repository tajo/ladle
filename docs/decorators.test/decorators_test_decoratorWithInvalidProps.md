# decorators.test.decoratorWithInvalidProps

- **Type:** function
- **Language:** typescript
- **File:** `\type-tests\decorators.test.tsx` (lines 32-37)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(Component) => (
  <div>
    {/* @ts-expect-error - 5 is a number, foo is a string */}
    <Component foo={5} />
  </div>
)
```

## Docstring

_No docstring provided._

## Source

```
const decoratorWithInvalidProps: StoryDecorator<FooProps> = (Component) => (
  <div>
    {/* @ts-expect-error - 5 is a number, foo is a string */}
    <Component foo={5} />
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
