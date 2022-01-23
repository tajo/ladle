import * as React from "react";
import { stories as unsortedStories } from "../generated/generated-list";
import Story from "./story";
import NoStories from "./no-stories";
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
import { getQuery as getQueryTheme } from "./addons/theme";
import { getQuery as getQueryMode } from "./addons/mode";
import { getQuery as getQueryRtl } from "./addons/rtl";
import { getQuery as getQueryControl } from "./addons/control";
import { Context } from "./context";
import {
  getQueryStory,
  storyIdToTitle,
  isQueryStorySet,
  sortStories,
} from "./story-name";

const stories = Object.keys(unsortedStories).sort(sortStories);
debug("Stories found", stories);

const getUrlState = (search: string): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search),
  rtl: getQueryRtl(search),
  control: getQueryControl(search),
});

const App: React.FC<{}> = () => {
  const initialGlobalState = getUrlState(location.search);
  const [globalState, dispatch] = React.useReducer(reducer, initialGlobalState);
  const prevGlobalStateRef = React.useRef<Partial<GlobalState>>({});
  React.useEffect(() => {
    prevGlobalStateRef.current = globalState;
  });
  const prevGlobalState = prevGlobalStateRef.current;
  React.useEffect(() => {
    debug("Global state update", globalState);
    if (!isQueryStorySet(location.search)) {
      modifyParams({ story: globalState.story });
    }
    modifyParams({
      mode: globalState.mode,
      rtl: globalState.rtl,
      story: globalState.story,
      theme: globalState.theme,
      control: globalState.control,
    });
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
          const urlControl = getUrlState(location.search).control[control];
          controls[control] = {
            ...globalState.control[control],
            value: urlControl
              ? urlControl.value
              : globalState.control[control].defaultValue,
          };
        });
        dispatch({
          type: ActionType.UpdateAll,
          value: { ...getUrlState(location.search), control: controls },
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
        ) : (
          <NoStories />
        )}
      </main>
      <Navigation
        stories={stories}
        story={globalState.story}
        updateStory={(story) =>
          dispatch({ type: ActionType.UpdateStory, value: story })
        }
      />
      <AddonPanel globalState={globalState} dispatch={dispatch} />
    </Context.Provider>
  );
};

export default App;
