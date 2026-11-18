# decorators.test.decoratorWithNoProps

- **Type:** function
- **Language:** typescript
- **File:** `\type-tests\decorators.test.tsx` (lines 43-49)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(Component) => (
  <div>
    <Component />
  </div>
);

export const DecoratorsWithNoProps: Story<FooProps> = Foo
```

## Docstring

_No docstring provided._

## Source

```
const decoratorWithNoProps: StoryDecorator = (Component) => (
  <div>
    <Component />
  </div>
);

export const DecoratorsWithNoProps: Story<FooProps> = Foo;
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
