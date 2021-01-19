import React, { Suspense } from "react";
import queryString from "query-string";
//@ts-ignore
import { stories, Provider } from "./generated-list";
import Navigation from "./navigation";
import Extensions from "./extensions";
import history from "./history";
import ErrorBoundary from "./error-boundary";

const getQueryStory = (locationSearch: string) =>
  queryString.parse(locationSearch).story as string;

const App: React.FC<{ config: any }> = ({ config }) => {
  const firstStory = Object.keys(stories)[0];
  const [activeStory, setActiveStory] = React.useState(
    getQueryStory(location.search)
  );

  React.useEffect(() => {
    if (!activeStory && !getQueryStory(location.search)) {
      history.push(`?story=${firstStory}`);
      setActiveStory(firstStory);
    }
    const unlisten = history.listen(({ location }) => {
      setActiveStory(getQueryStory(location.search));
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div className="ladle-wrapper">
      <main className="ladle-main">
        <Provider config={config}>
          {activeStory && (
            <ErrorBoundary>
              <Suspense fallback={null}>
                {stories[activeStory] ? (
                  React.createElement(stories[activeStory].component)
                ) : (
                  <h1>No story found.</h1>
                )}
              </Suspense>
            </ErrorBoundary>
          )}
        </Provider>
      </main>
      <Navigation stories={Object.keys(stories)} activeStory={activeStory} />
      <Extensions />
    </div>
  );
};

export default App;
