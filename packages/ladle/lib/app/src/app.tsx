import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  stories as unsortedStories,
  errorMessage,
} from "virtual:generated-list";
import Story from "./story";
import NoStories from "./no-stories";
import NoStoriesError from "./no-stories-error";
import Navigation from "./sidebar/main";
import AddonPanel from "./addon-panel";
import { modifyParams, history, Action } from "./history";
import reducer from "./reducer";
import {
  ModeState,
  GlobalState,
  ActionType,
  ControlState,
} from "../../shared/types";
import debug from "./debug";
import config from "./get-config";
import { getQuery as getQueryTheme } from "./addons/theme";
import { getQuery as getQueryMode } from "./addons/mode";
import { getQuery as getQueryRtl } from "./addons/rtl";
import { getQuery as getQuerySource } from "./addons/source";
import { getQuery as getQueryControl } from "./addons/control";
import { getQuery as getQueryWidth } from "./addons/width";
import { Context } from "./context";
import {
  getQueryStory,
  storyIdToTitle,
  isQueryStorySet,
  sortStories,
} from "./story-name";

const stories = sortStories(Object.keys(unsortedStories), config.storyOrder);
debug("Stories found", stories);

const getUrlState = (
  search: string,
  globalState?: GlobalState,
): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search, config.defaultStory),
  rtl: getQueryRtl(search),
  source: getQuerySource(search),
  width: getQueryWidth(search),
  control: getQueryControl(search, globalState ? globalState.control : {}),
  action: [],
  controlInitialized: false,
  hotkeys: true,
});

const App = () => {
  const initialGlobalState = getUrlState(location.search);
  const [globalState, dispatch] = React.useReducer(reducer, initialGlobalState);
  const prevGlobalStateRef = React.useRef<Partial<GlobalState>>({});
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
  return (
    <Context.Provider value={{ globalState, dispatch }}>
      <main className="ladle-main">
        {stories.length > 0 ? (
          <Story globalState={globalState} dispatch={dispatch} />
        ) : errorMessage ? (
          <NoStoriesError error={errorMessage} />
        ) : (
          <NoStories />
        )}
      </main>
      <Navigation
        stories={stories}
        hotkeys={globalState.hotkeys}
        story={globalState.story}
        updateStory={(story) => {
          // we need to strip the control state from the URL first
          // so it doesn't leak into other stories with the same named controls
          modifyParams({
            ...globalState,
            story,
            control: {},
          });
          dispatch({ type: ActionType.UpdateStory, value: story });
        }}
      />
      <AddonPanel globalState={globalState} dispatch={dispatch} />
    </Context.Provider>
  );
};

export default App;
