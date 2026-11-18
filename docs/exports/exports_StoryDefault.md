# exports.StoryDefault

- **Type:** interface
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 73-81)
- **Role:** protocol
- **Stability:** unknown

## Signature

```
interface StoryDefault<P = {}> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  title?: string;
  msw?: msw.RequestHandler[];
  parameters?: { [key: string]: any };
}
```

## Docstring

_No docstring provided._

## Source

```
export interface StoryDefault<P = {}> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  title?: string;
  msw?: msw.RequestHandler[];
  parameters?: { [key: string]: any };
}
```

## Git History

- Commits: 28
- Authors: 8
- Bug fixes: 2
- Features: 17

## Callers

None

## Callees

None
