# exports.Story

- **Type:** interface
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 83-91)
- **Role:** protocol
- **Stability:** unknown

## Signature

```
interface Story<P = {}> extends React.FC<P> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  storyName?: string;
  msw?: msw.RequestHandler[];
  parameters?: { [key: string]: any };
}
```

## Docstring

_No docstring provided._

## Source

```
export interface Story<P = {}> extends React.FC<P> {
  args?: Args<P>;
  argTypes?: ArgTypes<P>;
  decorators?: StoryDecorator<P>[];
  meta?: Meta;
  storyName?: string;
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
