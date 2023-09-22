import * as React from "react";
import { MDXProvider } from "@mdx-js/react";
import SynchronizeHead from "./synchronize-head";
import ErrorBoundary from "./error-boundary";
import Msw from "./msw";
import { stories, Provider } from "virtual:generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import { ActionType } from "../../shared/types";
import config from "./get-config";
import StoryNotFound from "./story-not-found";
import { ModeState } from "../../shared/types";
import { CodeHighlight } from "./addons/source";
import { Frame } from "./iframe";
import { set, reset } from "./mock-date";

const StoryFrame = ({
  children,
  active,
  width,
  story,
  mode,
}: {
  children: React.ReactElement;
  active: boolean;
  width: number;
  mode: ModeState;
  story: string;
}) => {
  if ((!active && width === 0) || mode === ModeState.Preview) return children;
  return (
    <Frame
      title={`Story ${story}`}
      initialContent={`<!DOCTYPE html><html><head><base target="_parent" /></head><body style="margin:0"><div id="root"></div></body></html>`}
      mountTarget="#root"
      className="ladle-iframe"
      style={{ width: width || "100%" }}
    >
      {children}
    </Frame>
  );
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
  const hotkeys = storyDataMeta ? storyDataMeta.hotkeys : true;
  const mockDate = storyDataMeta ? storyDataMeta.mockDate : undefined;

  const iframeActive: boolean =
    storyData && storyDataMeta ? storyDataMeta.iframed : false;
  let metaWidth = storyData && storyDataMeta ? storyDataMeta.width : 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (key === metaWidth) {
      metaWidth = config.addons.width.options[key];
    }
  });
  React.useEffect(() => {
    mockDate ? set(mockDate) : reset();
  }, [mockDate]);
  React.useEffect(() => {
    if (typeof hotkeys !== "undefined" && hotkeys !== globalState.hotkeys) {
      dispatch({ type: ActionType.UpdateHotkeys, value: hotkeys });
    }
  }, [hotkeys]);
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
      document.documentElement.setAttribute("data-iframed", `${width}`);
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
        >
          <SynchronizeHead
            active={
              (iframeActive || width > 0) &&
              globalState.mode !== ModeState.Preview
            }
            rtl={globalState.rtl}
            width={width}
          >
            <Msw msw={storyDataMeta && storyDataMeta.msw}>
              <MDXProvider
                components={{
                  code: (props) => (
                    <CodeHighlight
                      {...(props as any)}
                      theme={globalState.theme}
                    />
                  ),
                }}
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
                    <StoryNotFound activeStory={globalState.story} />
                  )}
                </Provider>
              </MDXProvider>
            </Msw>
          </SynchronizeHead>
        </StoryFrame>
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default Story;
