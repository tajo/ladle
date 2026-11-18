# dialog.oveScrollSideCar(pr

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\dialog.tsx` (lines 3684-3871)
- **Role:** internal
- **Stability:** unknown

## Signature

```
ction RemoveScrollSideCar(props) {
  const shouldPreventQueue = react.useRef([]);
  const touchStartRef = react.useRef([0, 0]);
  const activeAxis = react.useRef();
  const id = react.useState(idCounter++)[0];
  const Style = react.useState(function () {
    return styleSingleton();
  })[0];
  const lastProps = react.useRef(props);
  react.useEffect(
    function () {
      lastProps.current = props;
    },
    [props],
  );
  react.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add("block-interactivity-" + id);
        const allow_1 = [props.lockRef.current]
          .concat((props.shards || []).map(extractRef))
          .filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add("allow-interactivity-" + id);
        });
        return function () {
          document.body.classList.remove("block-interactivity-" + id);
          allow_1.forEach(function (el) {
            return el.classList.remove("allow-interactivity-" + id);
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards],
  );
  const shouldCancelEvent = react.useCallback(function (event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    const touch = getTouchXY(event);
    const touchStart = touchStartRef.current;
    const deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    const deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    let currentAxis;
    const target = event.target;
    const moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    let canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target,
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target,
      );
      // other axis might be not scrollable
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      "changedTouches" in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    const cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis === "h" ? deltaX : deltaY,
      true,
    );
  }, []);
  const shouldPrevent = react.useCallback(function (_event) {
    const event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
      // not the last active
      return;
    }
    const delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    const sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        e.target === event.target &&
        deltaCompare(e.delta, delta)
      );
    })[0];
    // self event, and should be canceled
    if (sourceEvent && sourceEvent.should) {
      event.preventDefault();
      return;
    }
    // outside or shard event
    if (!sourceEvent) {
      const shardNodes = (lastProps.current.shards || [])
        .map(extractRef)
        .filter(Boolean)
        .filter(function (node) {
          return node.contains(event.target);
        });
      const shouldStop =
        shardNodes.length > 0
          ? shouldCancelEvent(event, shardNodes[0])
          : !lastProps.current.noIsolation;
      if (shouldStop) {
        event.preventDefault();
      }
    }
  }, []);
  const shouldCancel = react.useCallback(function (
    name,
    delta,
    target,
    should,
  ) {
    const event = { name: name, delta: delta, target: target, should: should };
    shouldPreventQueue.current.push(event);
    setTimeout(function () {
      shouldPreventQueue.current = shouldPreventQueue.current.filter(
        function (e) {
          return e !== event;
        },
      );
    }, 1);
  }, []);
  const scrollTouchStart = react.useCallback(function (event) {
    touchStartRef.current = getTouchXY(event);
    activeAxis.current = undefined;
  }, []);
  const scrollWheel = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getDeltaXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  const scrollTouchMove = react.useCallback(function (event) {
    shouldCancel(
      event.type,
      getTouchXY(event),
      event.target,
      shouldCancelEvent(event, props.lockRef.current),
    );
  }, []);
  react.useEffect(function () {
    lockStack.push(Style);
    props.setCallbacks({
      onScrollCapture: scrollWheel,
      onWheelCapture: scrollWheel,
      onTouchMoveCapture: scrollTouchMove,
    });
    document.addEventListener("wheel", shouldPrevent, nonPassive);
    document.addEventListener("touchmove", shouldPrevent, nonPassive);
    document.addEventListener("touchstart", scrollTouchStart, nonPassive);
    return function () {
      lockStack = lockStack.filter(function (inst) {
        return inst !== Style;
      });
      document.removeEventListener("wheel", shouldPrevent, nonPassive);
      document.removeEventListener("touchmove", shouldPrevent, nonPassive);
      document.removeEventListener("touchstart", scrollTouchStart, nonPassive);
    };
  }, []);
  const removeScrollBar = props.removeScrollBar,
    inert = props.inert;
  return react.createElement(
    react.Fragment,
    null,
    inert ? react.createElement(Style, { styles: generateStyle(id) }) : null,
    removeScrollBar
      ? react.createElement(RemoveScrollBar, { gapMode: "margin" })
      : null,
  );
}

c
```

## Docstring

_No docstring provided._

## Source

```
function RemoveScrollSideCar(props) {
  const shouldPreventQueue = react.useRef([]);
  const touchStartRef = react.useRef([0, 0]);
  const activeAxis = react.useRef();
  const id = react.useState(idCounter++)[0];
  const Style = react.useState(function () {
    return styleSingleton();
  })[0];
  const lastProps = react.useRef(props);
  react.useEffect(
    function () {
      lastProps.current = props;
    },
    [props],
  );
  react.useEffect(
    function () {
      if (props.inert) {
        document.body.classList.add("block-interactivity-" + id);
        const allow_1 = [props.lockRef.current]
          .concat((props.shards || []).map(extractRef))
          .filter(Boolean);
        allow_1.forEach(function (el) {
          return el.classList.add("allow-interactivity-" + id);
        });
        return function () {
          document.body.classList.remove("block-interactivity-" + id);
          allow_1.forEach(function (el) {
            return el.classList.remove("allow-interactivity-" + id);
          });
        };
      }
      return;
    },
    [props.inert, props.lockRef.current, props.shards],
  );
  const shouldCancelEvent = react.useCallback(function (event, parent) {
    if ("touches" in event && event.touches.length === 2) {
      return !lastProps.current.allowPinchZoom;
    }
    const touch = getTouchXY(event);
    const touchStart = touchStartRef.current;
    const deltaX = "deltaX" in event ? event.deltaX : touchStart[0] - touch[0];
    const deltaY = "deltaY" in event ? event.deltaY : touchStart[1] - touch[1];
    let currentAxis;
    const target = event.target;
    const moveDirection = Math.abs(deltaX) > Math.abs(deltaY) ? "h" : "v";
    let canBeScrolledInMainDirection = locationCouldBeScrolled(
      moveDirection,
      target,
    );
    if (!canBeScrolledInMainDirection) {
      return true;
    }
    if (canBeScrolledInMainDirection) {
      currentAxis = moveDirection;
    } else {
      currentAxis = moveDirection === "v" ? "h" : "v";
      canBeScrolledInMainDirection = locationCouldBeScrolled(
        moveDirection,
        target,
      );
      // other axis might be not scrollable
    }
    if (!canBeScrolledInMainDirection) {
      return false;
    }
    if (
      !activeAxis.current &&
      "changedTouches" in event &&
      (deltaX || deltaY)
    ) {
      activeAxis.current = currentAxis;
    }
    if (!currentAxis) {
      return true;
    }
    const cancelingAxis = activeAxis.current || currentAxis;
    return handleScroll(
      cancelingAxis,
      parent,
      event,
      cancelingAxis === "h" ? deltaX : deltaY,
      true,
    );
  }, []);
  const shouldPrevent = react.useCallback(function (_event) {
    const event = _event;
    if (!lockStack.length || lockStack[lockStack.length - 1] !== Style) {
      // not the last active
      return;
    }
    const delta = "deltaY" in event ? getDeltaXY(event) : getTouchXY(event);
    const sourceEvent = shouldPreventQueue.current.filter(function (e) {
      return (
        e.name === event.type &&
        e.target === event.target &&
        deltaCompare(e.delta, delta)
      );
    })[0];
... (truncated)
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
