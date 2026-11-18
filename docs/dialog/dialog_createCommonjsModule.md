# dialog.createCommonjsModule

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 30-45)
- **Role:** internal
- **Stability:** unknown

## Signature

```
function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base,
        );
      },
    }),
    fn(module, module.exports),
    module.exports
  );
}
```

## Docstring

_No docstring provided._

## Source

```
function createCommonjsModule(fn, basedir, module) {
  return (
    (module = {
      path: basedir,
      exports: {},
      require: function (path, base) {
        return commonjsRequire(
          path,
          base === undefined || base === null ? module.path : base,
        );
      },
    }),
    fn(module, module.exports),
    module.exports
  );
}
```

## Git History

- Commits: 2
- Authors: 1
- Bug fixes: 0
- Features: 0

## Callers

None

## Callees

None
