# exports.ArgType

- **Type:** interface
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\exports.ts` (lines 114-131)
- **Role:** protocol
- **Stability:** unknown

## Signature

```
interface ArgType<K = any> {
  control?: {
    name?: string;
    labels?: { [key: string]: string };
    type: ControlType;
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  mapping?: { [key: string | number]: any };
  options?: K[] | unknown;
  defaultValue?: K;
  description?: string;
  name?: string;
  action?: string;
  [key: string]: any;
}
```

## Docstring

_No docstring provided._

## Source

```
export interface ArgType<K = any> {
  control?: {
    name?: string;
    labels?: { [key: string]: string };
    type: ControlType;
    min?: number;
    max?: number;
    step?: number;
    [key: string]: any;
  };
  mapping?: { [key: string | number]: any };
  options?: K[] | unknown;
  defaultValue?: K;
  description?: string;
  name?: string;
  action?: string;
  [key: string]: any;
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
