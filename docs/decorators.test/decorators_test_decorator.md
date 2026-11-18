# decorators.test.decorator

- **Type:** function
- **Language:** typescript
- **File:** `\type-tests\decorators.test.tsx` (lines 12-18)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(Component) => (
  <div>
    <Component />
  </div>
);

export const Decorators: Story<FooProps> = Foo
```

## Docstring

_No docstring provided._

## Source

```
const decorator: StoryDecorator<FooProps> = (Component) => (
  <div>
    <Component />
  </div>
);

export const Decorators: Story<FooProps> = Foo;
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
