import * as React from "react";
import Frame, { useFrame } from "react-frame-component";
import ErrorBoundary from "./error-boundary";
import { stories, Provider } from "virtual:generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import { ActionType } from "../../shared/types";
import config from "./get-config";
import NoStories from "./no-stories";
import { ModeState, ThemeState } from "../../shared/types";

const StoryFrame = ({
  children,
  active,
  width,
  darkTheme,
  story,
  mode,
}: {
  children: React.ReactElement;
  active: boolean;
  width: number;
  darkTheme: boolean;
  mode: ModeState;
  story: string;
}) => {
  if ((!active && width === 0) || mode === ModeState.Preview) return children;
  return (
    <Frame
      title={`Story ${story}`}
      initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>`}
      mountTarget="#root"
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
      {children}
    </Frame>
  );
};

// detecting parent's document.head changes, so we can apply the same CSS for
// the iframe, for CSS in JS we could target correct document directly but
// import './foo.css' always ends up in the parent only
const SynchronizeHead = ({
  active,
  children,
}: {
  active: boolean;
  children: JSX.Element;
}) => {
  const { window: storyWindow } = useFrame();
  const syncHead = () => {
    if (!storyWindow) return;
    [...(document.head.children as any)].forEach((child) => {
      if (
        child.tagName === "STYLE" ||
        (child.tagName === "LINK" &&
          (child.getAttribute("type") === "text/css" ||
            child.getAttribute("rel") === "stylesheet"))
      ) {
        storyWindow.document.head.appendChild(
          child.cloneNode(true),
        ) as HTMLStyleElement;
      }
    });
  };
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
    return;
  }, [active]);
  return children;
};

const Story = ({
  globalState,
  dispatch,
}: {
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}) => {
  const storyData = stories[globalState.story];
  const width = globalState.width;
  const storyDataMeta = storyData?.meta?.meta;

  const iframeActive: boolean =
    storyData && storyDataMeta ? storyDataMeta.iframed : false;
  let metaWidth = storyData && storyDataMeta ? storyDataMeta.width : 0;
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
  }, [metaWidth, globalState.story]);

  React.useEffect(() => {
    if (globalState.mode !== ModeState.Preview && (iframeActive || width)) {
      document.documentElement.setAttribute("data-iframed", "");
    } else {
      document.documentElement.removeAttribute("data-iframed");
    }
  }, [iframeActive, globalState.story, globalState.mode, globalState.width]);

  if (!globalState.story) {
    return null;
  }

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
          <SynchronizeHead
            active={
              (iframeActive || width > 0) &&
              globalState.mode !== ModeState.Preview
            }
          >
            <Provider
              config={config}
              globalState={globalState}
              dispatch={dispatch}
              storyMeta={storyDataMeta}
            >
              {storyData ? (
                React.createElement(storyData.component)
              ) : (
                <NoStories wrongUrl activeStory={globalState.story} />
              )}
            </Provider>
          </SynchronizeHead>
        </StoryFrame>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Story;
