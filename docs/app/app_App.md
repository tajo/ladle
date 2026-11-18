# app.App

- **Type:** function
- **Language:** typescript
- **File:** `\packages\ladle\lib\app\src\app.tsx` (lines 55-169)
- **Role:** internal
- **Stability:** unknown

## Signature

```
() => {
  const initialGlobalState = getUrlState(location.search);
  const [globalState, dispatch] = React.useReducer(reducer, initialGlobalState);
  const prevGlobalStateRef = React.useRef<Partial<GlobalState>>({});
  const [search, setSearch] = React.useState("");

  let customBackground = "";
  if (globalState.control) {
    Object.keys(globalState.control).forEach((key) => {
      if (globalState.control[key].type === "background") {
        customBackground = globalState.control[key].value || "";
      }
    });
  }
  useHotkeys(
    config.hotkeys.fullscreen,
    () => {
      dispatch({
        type: ActionType.UpdateMode,
        value:
          globalState.mode === ModeState.Full
            ? ModeState.Preview
            : ModeState.Full,
      });
    },
    {
      preventDefault: true,
      enabled: globalState.hotkeys && config.addons.mode.enabled,
    },
  );
  React.useEffect(() => {
    // @ts-ignore
    document.getElementsByClassName("ladle-background")[0].style.background =
      customBackground;
  }, [customBackground]);

  React.useEffect(() => {
    prevGlobalStateRef.current = globalState;
  });
  React.useEffect(() => {
    // a workaround to allow APIs like action() and linkTo() getting around
    // the context hook limitations
    //@ts-ignore
    window.ladleDispatch = dispatch;
  }, []);
  const prevGlobalState = prevGlobalStateRef.current;
  React.useEffect(() => {
    debug("Global state update", globalState);
    if (!isQueryStorySet(location.search)) {
      modifyParams(globalState);
    }
    modifyParams(globalState);
    if (globalState.story !== prevGlobalState.story) {
      document.title = `${storyIdToTitle(globalState.story)} | Ladle`;
    }
    if (globalState.theme !== prevGlobalState.theme) {
      document.documentElement.setAttribute("data-theme", globalState.theme);
    }
    if (globalState.rtl !== prevGlobalState.rtl) {
      if (globalState.rtl) {
        document.documentElement.setAttribute("dir", "rtl");
      } else {
        document.documentElement.removeAttribute("dir");
      }
    }
    if (globalState.mode !== prevGlobalState.mode) {
      document.documentElement.setAttribute("data-mode", globalState.mode);
      if (globalState.mode === ModeState.Preview) {
        document.getElementById("ladle-root")?.removeAttribute("class");
      } else {
        document
          .getElementById("ladle-root")
          ?.setAttribute("class", "ladle-wrapper");
      }
    }
  }, [globalState]);

  // handle go back/forward browser buttons
  React.useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      if (action === Action.Pop) {
        const controls: ControlState = {};
        Object.keys(globalState.control).forEach((control) => {
          const urlControl = getUrlState(location.search, globalState).control[
            control
          ];
          controls[control] = {
            ...globalState.control[control],
            value: urlControl
              ? urlControl.value
              : globalState.control[control].defaultValue,
          };
        });
        const newState = getUrlState(location.search, globalState);
        dispatch({
          type: ActionType.UpdateAll,
          value: {
            ...newState,
            control: controls,
            controlInitialized:
              globalState.story === newState.story ? true : false,
          },
        });
      }
    });
    return () => unlisten();
  }, [globalState]);

  if (globalState.mode === ModeState.Preview) {
    return (
      <Context.Provider value={{ globalState, dispatch }}>
        <Story globalState={globalState} dispatch={dispatch} />
      </Context.Provider>
    );
  }
```

## Docstring

_No docstring provided._

## Source

```
const App = () => {
  const initialGlobalState = getUrlState(location.search);
  const [globalState, dispatch] = React.useReducer(reducer, initialGlobalState);
  const prevGlobalStateRef = React.useRef<Partial<GlobalState>>({});
  const [search, setSearch] = React.useState("");

  let customBackground = "";
  if (globalState.control) {
    Object.keys(globalState.control).forEach((key) => {
      if (globalState.control[key].type === "background") {
        customBackground = globalState.control[key].value || "";
      }
    });
  }
  useHotkeys(
    config.hotkeys.fullscreen,
    () => {
      dispatch({
        type: ActionType.UpdateMode,
        value:
          globalState.mode === ModeState.Full
            ? ModeState.Preview
            : ModeState.Full,
      });
    },
    {
      preventDefault: true,
      enabled: globalState.hotkeys && config.addons.mode.enabled,
    },
  );
  React.useEffect(() => {
    // @ts-ignore
    document.getElementsByClassName("ladle-background")[0].style.background =
      customBackground;
  }, [customBackground]);

  React.useEffect(() => {
    prevGlobalStateRef.current = globalState;
  });
  React.useEffect(() => {
    // a workaround to allow APIs like action() and linkTo() getting around
    // the context hook limitations
    //@ts-ignore
    window.ladleDispatch = dispatch;
  }, []);
  const prevGlobalState = prevGlobalStateRef.current;
  React.useEffect(() => {
    debug("Global state update", globalState);
    if (!isQueryStorySet(location.search)) {
      modifyParams(globalState);
    }
    modifyParams(globalState);
    if (globalState.story !== prevGlobalState.story) {
      document.title = `${storyIdToTitle(globalState.story)} | Ladle`;
    }
    if (globalState.theme !== prevGlobalState.theme) {
      document.documentElement.setAttribute("data-theme", globalState.theme);
    }
    if (globalState.rtl !== prevGlobalState.rtl) {
      if (globalState.rtl) {
        document.documentElement.setAttribute("dir", "rtl");
      } else {
        document.documentElement.removeAttribute("dir");
      }
    }
    if (globalState.mode !== prevGlobalState.mode) {
      document.documentElement.setAttribute("data-mode", globalState.mode);
      if (globalState.mode === ModeState.Preview) {
        document.getElementById("ladle-root")?.removeAttribute("class");
      } else {
        document
          .getElementById("ladle-root")
          ?.setAttribute("class", "ladle-wrapper");
      }
    }
  }, [globalState]);

  // handle go back/forward browser buttons
  React.useEffect(() => {
    const unlisten = history.listen(({ location, action }) => {
      if (action === Action.Pop) {
        const controls: ControlState = {};
        Object.keys(globalState.control).forEach((control) => {
          const urlControl = getUrlState(location.search, globalState).control[
            control
          ];
          controls[control] = {
            ...globalState.control[control],
            value: urlControl
              ? urlControl.value
              : globalState.control[control].defaultValue,
          };
        });
        const newState = getUrlState(location.search, globalState);
        dispatch({
          type: ActionType.UpdateAll,
          value: {
            ...newState,
            control: controls,
            controlInitialized:
... (truncated)
```

## Git History

- Commits: 14
- Authors: 3
- Bug fixes: 2
- Features: 8

## Callers

None

## Callees

None
