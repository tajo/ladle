import * as React from "react";
import ErrorBoundary from "./error-boundary";
import { stories, Provider } from "../generated/generated-list";
import { Ring } from "./icons";
import type { GlobalState, GlobalAction } from "../../shared/types";
import config from "./get-config";

// wonky types because the mocked generated module can't have types
const ProviderAny = Provider as any;
const storiesAny = stories as any;

const Story: React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = ({ globalState, dispatch }) =>
  globalState.story ? (
    <ErrorBoundary>
      <React.Suspense fallback={<Ring />}>
        <ProviderAny
          config={config}
          globalState={globalState}
          dispatch={dispatch}
        >
          {storiesAny[globalState.story] ? (
            React.createElement(storiesAny[globalState.story].component, {
              config,
              globalState,
              dispatch,
            })
          ) : (
            <h1>No story found.</h1>
          )}
        </ProviderAny>
      </React.Suspense>
    </ErrorBoundary>
  ) : null;

export default Story;
