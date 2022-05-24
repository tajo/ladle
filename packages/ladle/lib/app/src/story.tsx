import * as React from "react";
import ErrorBoundary from "./error-boundary";
import { stories, Provider } from "virtual:generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import config from "./get-config";
import NoStories from "./no-stories";

const Story: React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = ({ globalState, dispatch }) =>
  globalState.story ? (
    <ErrorBoundary>
      <React.Suspense fallback={<Ring />}>
        <Provider config={config} globalState={globalState} dispatch={dispatch}>
          {stories[globalState.story] ? (
            React.createElement(stories[globalState.story].component)
          ) : (
            <NoStories wrongUrl activeStory={globalState.story} />
          )}
        </Provider>
      </React.Suspense>
    </ErrorBoundary>
  ) : null;

export default Story;
