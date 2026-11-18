# dialog.hSideEffect(re

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 2314-2392)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction withSideEffect(reducePropsToState, handleStateChangeOnClient) {
  {
    if (typeof reducePropsToState !== "function") {
      throw new Error("Expected reducePropsToState to be a function.");
    }

    if (typeof handleStateChangeOnClient !== "function") {
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    }
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }

  return function wrap(WrappedComponent) {
    {
      if (typeof WrappedComponent !== "function") {
        throw new Error("Expected WrappedComponent to be a React component.");
      }
    }

    const mountedInstances = [];
    let state;

    function emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
    }

    const SideEffect = /*#__PURE__*/ (function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      const _proto = SideEffect.prototype;

      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        const index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/ react.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    })(react.PureComponent);

    _defineProperty(
      SideEffect,
      "displayName",
      "SideEffect(" + getDisplayName(WrappedComponent) + ")",
    );

    return SideEffect;
  };
}

c
```

## Docstring

_No docstring provided._

## Source

```
function withSideEffect(reducePropsToState, handleStateChangeOnClient) {
  {
    if (typeof reducePropsToState !== "function") {
      throw new Error("Expected reducePropsToState to be a function.");
    }

    if (typeof handleStateChangeOnClient !== "function") {
      throw new Error("Expected handleStateChangeOnClient to be a function.");
    }
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
  }

  return function wrap(WrappedComponent) {
    {
      if (typeof WrappedComponent !== "function") {
        throw new Error("Expected WrappedComponent to be a React component.");
      }
    }

    const mountedInstances = [];
    let state;

    function emitChange() {
      state = reducePropsToState(
        mountedInstances.map(function (instance) {
          return instance.props;
        }),
      );
      handleStateChangeOnClient(state);
    }

    const SideEffect = /*#__PURE__*/ (function (_PureComponent) {
      _inheritsLoose(SideEffect, _PureComponent);

      function SideEffect() {
        return _PureComponent.apply(this, arguments) || this;
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      const _proto = SideEffect.prototype;

      _proto.componentDidMount = function componentDidMount() {
        mountedInstances.push(this);
        emitChange();
      };

      _proto.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        const index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      _proto.render = function render() {
        return /*#__PURE__*/ react.createElement(WrappedComponent, this.props);
      };

      return SideEffect;
    })(react.PureComponent);

    _defineProperty(
      SideEffect,
      "displayName",
      "SideEffect(" + getDisplayName(WrappedComponent) + ")",
    );

    return SideEffect;
  };
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
