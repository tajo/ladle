import React, { Suspense } from "react";
//import Emittery from "emittery";
import { createBrowserHistory } from "history";
import queryString from "query-string";
// @ts-ignore
import { stories } from "./list";

const history = createBrowserHistory();

// const emitter = new Emittery();
// const STORY_IMPORTED = "story-imported";
//emitter.emit(STORY_IMPORTED, module.Middle.title);

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      history.push(href);
    }}
  >
    {children}
  </a>
);

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
    queryString.parse(location.search).path
  );
  console.log(activeStory);
  React.useEffect(() => {
    if (!activeStory) {
      history.push(`/?path=${firstStory}`);
      setActiveStory(firstStory);
    }
  }, []);

  React.useEffect(() => {
    let unlisten = history.listen(({ location }) => {
      const newStory = queryString.parse(location.search).path;
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
      <ul>
        {Object.keys(stories).map((id) => (
          <li key={id}>
            <Link href={`/?path=${id}`}>{stories[id].name}</Link>
          </li>
        ))}
      </ul>
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
