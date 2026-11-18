# dialog.tChange() 

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 2339-2346)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
    }

 
```

## Docstring

_No docstring provided._

## Source

```
    function emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
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
