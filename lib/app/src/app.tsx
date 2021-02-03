import * as React from "react";
//@ts-ignore
import { stories } from "../generated/generated-list";
import Story from "./story";
import Navigation from "./navigation";
import AddonPanel from "./addon-panel";
import { modifyParams, history } from "./history";
import reducer from "./reducer";
import { ModeState, GlobalState, ActionType } from "../../shared/types";
import debug from "./debug";
import { getQuery as getQueryTheme } from "./addons/theme";
import { getQuery as getQueryMode } from "./addons/mode";
import { getQuery as getQueryRtl } from "./addons/rtl";
import { getQueryStory, storyIdToTitle, isQueryStorySet } from "./story-name";

debug("Stories found", Object.keys(stories));

const getUrlState = (search: string): GlobalState => ({
  theme: getQueryTheme(search),
  mode: getQueryMode(search),
  story: getQueryStory(search),
  rtl: getQueryRtl(search),
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
    const unlisten = history.listen(({ action, location }) => {
      console.log(action);
      if (action === "POP") {
        dispatch({
          type: ActionType.UpdateAll,
          value: getUrlState(location.search),
        });
      }
    });
    return () => unlisten();
  });

  if (globalState.mode === ModeState.Preview) {
    return <Story globalState={globalState} dispatch={dispatch} />;
  }
  return (
    <>
      <main className="ladle-main">
        <Story globalState={globalState} dispatch={dispatch} />
      </main>
      <Navigation
        stories={Object.keys(stories)}
        story={globalState.story}
        updateStory={(story) =>
          dispatch({ type: ActionType.UpdateStory, value: story })
        }
      />
      <AddonPanel globalState={globalState} dispatch={dispatch} />
    </>
  );
};

export default App;
