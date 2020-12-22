import React, { Suspense } from "react";
import queryString from "query-string";
//@ts-ignore
import { stories, list } from "./generated-list";
import Navigation from "./navigation";
import Extensions from "./extensions";
import history from "./history";
import ErrorBoundary from "./error-boundary";

// const emitter = new Emittery();
// const STORY_IMPORTED = "story-imported";
//emitter.emit(STORY_IMPORTED, module.Middle.title);

const getQueryStory = (locationSearch: string) =>
  queryString.parse(locationSearch).story as string;

const openStorySelector = (zEvent: any) => {
  if (zEvent.metaKey && zEvent.key === "p") {
    // case sen sitive
    zEvent.preventDefault();
    console.log("THIS THIS TasdHIS");
  }
};

const App: React.FC = () => {
  //const [dato, setData] = React.useState("empty");
  // React.useEffect(() => {
  //   emitter.on(STORY_IMPORTED, setData);
  //   return () => {
  //     emitter.off(STORY_IMPORTED, setData);
  //   };
  // });
  const firstStory = list[0];
  const [activeStory, setActiveStory] = React.useState(
    getQueryStory(location.search)
  );

  React.useEffect(() => {
    if (!activeStory && !getQueryStory(location.search)) {
      history.push(`?story=${firstStory}`);
      setActiveStory(firstStory);
    }
    document.addEventListener("keydown", openStorySelector);
    const unlisten = history.listen(({ location }) => {
      setActiveStory(getQueryStory(location.search));
    });
    return () => {
      document.removeEventListener("keydown", openStorySelector);
      unlisten();
    };
  }, []);

  return (
    <div className="ladle-wrapper">
      <main className="ladle-main">
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
      </main>
      <Navigation stories={list} activeStory={activeStory} />
      <Extensions />
    </div>
  );
};

export default App;
