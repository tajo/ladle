import * as React from "react";
import Frame, { FrameContextConsumer } from "react-frame-component";
import ErrorBoundary from "./error-boundary";
import { stories, Provider } from "virtual:generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import { ActionType } from "../../shared/types";
import config from "./get-config";
import NoStories from "./no-stories";
import { ModeState, ThemeState } from "../../shared/types";

const frameDefaultHead = `<base target="_parent" />`;

const StoryFrame: React.FC<{
  children: (storyWindow: Window) => React.ReactElement;
  active: boolean;
  width: number;
  darkTheme: boolean;
  mode: ModeState;
  story: string;
}> = ({ children, active, width, darkTheme, story, mode }) => {
  if ((!active && width === 0) || mode === ModeState.Preview)
    return children(window);
  return (
    <Frame
      title={`Story ${story}`}
      style={{
        height: width ? "calc(100% - 128px)" : "100%",
        width: width || "100%",
        minHeight: "500px",
        marginTop: width ? "64px" : 0,
        marginBottom: width ? "64px" : 0,
        backgroundColor: darkTheme ? "#141414" : "#fff",
        border: 0,
        boxShadow: width
          ? "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          : "none",
      }}
    >
      <FrameContextConsumer>
        {(frameContext) => children(frameContext.window as Window)}
      </FrameContextConsumer>
    </Frame>
  );
};

// detecting parent's document.head changes so we can apply the same CSS for
// the iframe, for CSS in JS we could target correct document directly but
// import './foo.css' always ends up in the parent only
const SynchronizeHead: React.FC<{
  active: boolean;
  storyWindow: Window;
  children: JSX.Element;
}> = ({ active, children, storyWindow }) => {
  const syncHead = () =>
    (storyWindow.document.head.innerHTML =
      `${document.head.innerHTML}${frameDefaultHead}`.replace(
        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        "",
      ));
  React.useEffect(() => {
    if (active) {
      syncHead();
      const observer = new MutationObserver(() => syncHead());
      document.documentElement.setAttribute("data-iframed", "");
      observer.observe(document.head, {
        subtree: true,
        characterData: true,
        childList: true,
      });
      return () => {
        observer && observer.disconnect();
      };
    }
    return () => null;
  }, [active]);
  return children;
};

const Story: React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = ({ globalState, dispatch }) => {
  if (!globalState.story) {
    return null;
  }
  const storyData = stories[globalState.story];
  const width = globalState.width;

  const iframeActive: boolean =
    storyData && storyData.meta ? storyData.meta.meta.iframed : false;
  let metaWidth = storyData && storyData.meta ? storyData.meta.meta.width : 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (key === metaWidth) {
      metaWidth = config.addons.width.options[key];
    }
  });
  React.useEffect(() => {
    if (metaWidth && metaWidth !== 0) {
      dispatch({ type: ActionType.UpdateWidth, value: metaWidth });
      return;
    }
    if (config.addons.width.defaultState !== 0) {
      dispatch({
        type: ActionType.UpdateWidth,
        value: config.addons.width.defaultState,
      });
    }
  }, [metaWidth]);

  React.useEffect(() => {
    if (globalState.mode !== ModeState.Preview && (iframeActive || width)) {
      document.documentElement.setAttribute("data-iframed", "");
    } else {
      document.documentElement.removeAttribute("data-iframed");
    }
  }, [iframeActive, globalState.story, globalState.mode, globalState.width]);

  return (
    <ErrorBoundary>
      <React.Suspense fallback={<Ring />}>
        <StoryFrame
          active={iframeActive}
          story={globalState.story}
          width={width}
          mode={globalState.mode}
          darkTheme={globalState.theme === ThemeState.Dark}
        >
          {(storyWindow) => (
            <SynchronizeHead
              storyWindow={storyWindow}
              active={
                (iframeActive || width > 0) &&
                globalState.mode !== ModeState.Preview
              }
            >
              <Provider
                config={config}
                globalState={globalState}
                dispatch={dispatch}
                storyWindow={storyWindow}
              >
                {storyData ? (
                  React.createElement(storyData.component)
                ) : (
                  <NoStories wrongUrl activeStory={globalState.story} />
                )}
              </Provider>
            </SynchronizeHead>
          )}
        </StoryFrame>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Story;
