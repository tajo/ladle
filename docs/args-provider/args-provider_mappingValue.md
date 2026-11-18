# args-provider.mappingValue

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\args-provider.tsx` (lines 151-161)
- **Role:** internal
- **Stability:** unknown

## Signature

```
(key: string, value: any) => {
    if (
      argTypes &&
      argTypes[key] &&
      argTypes[key].mapping &&
      Object.prototype.hasOwnProperty.call(argTypes[key].mapping, value)
    ) {
      return argTypes[key].mapping[value];
    }
    return value;
  }
```

## Docstring

_No docstring provided._

## Source

```
  const mappingValue = (key: string, value: any) => {
    if (
      argTypes &&
      argTypes[key] &&
      argTypes[key].mapping &&
      Object.prototype.hasOwnProperty.call(argTypes[key].mapping, value)
    ) {
      return argTypes[key].mapping[value];
    }
    return value;
  };
```

## Git History

- Commits: 18
- Authors: 4
- Bug fixes: 3
- Features: 6

## Callers

None

## Callees

None
