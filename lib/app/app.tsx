import React, { Suspense } from "react";
//import Emittery from "emittery";
import queryString from "query-string";
import { stories } from "./list";
import Navigation from "./navigation";
import history from "./history";

// const emitter = new Emittery();
// const STORY_IMPORTED = "story-imported";
//emitter.emit(STORY_IMPORTED, module.Middle.title);

const getQueryPath = (locationSearch: string) =>
  queryString.parse(locationSearch).path as string;

const App: React.FC = () => {
  //const [dato, setData] = React.useState("empty");
  // React.useEffect(() => {
  //   emitter.on(STORY_IMPORTED, setData);
  //   return () => {
  //     emitter.off(STORY_IMPORTED, setData);
  //   };
  // });
  const firstStory = Object.keys(stories)[0];
  const [activeStory, setActiveStory] = React.useState(
    getQueryPath(location.search)
  );
  React.useEffect(() => {
    if (!activeStory) {
      history.push(`?path=${firstStory}`);
      setActiveStory(firstStory);
    }
  }, []);

  React.useEffect(() => {
    let unlisten = history.listen(({ location }) => {
      const newStory = getQueryPath(location.search);
      if (newStory !== activeStory) {
        setActiveStory(newStory);
      }
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <div>
      <Navigation />
      <hr />
      {activeStory && (
        <Suspense fallback={null}>
          {stories[activeStory] ? (
            React.createElement(stories[activeStory].component)
          ) : (
            <h1>No story found.</h1>
          )}
        </Suspense>
      )}
    </div>
  );
};

export default App;
