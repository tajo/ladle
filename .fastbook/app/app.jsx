import React, { Suspense } from "react";
//import Emittery from "emittery";
import { createBrowserHistory } from "history";
import { stories } from "./list";

const history = createBrowserHistory();

// const emitter = new Emittery();
// const STORY_IMPORTED = "story-imported";
//emitter.emit(STORY_IMPORTED, module.Middle.title);

const Link = ({ href, children }) => (
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

const App = () => {
  //const [dato, setData] = React.useState("empty");
  // React.useEffect(() => {
  //   emitter.on(STORY_IMPORTED, setData);
  //   return () => {
  //     emitter.off(STORY_IMPORTED, setData);
  //   };
  // });
  console.log(what);
  const [activeStory, setActiveStory] = React.useState("a1--haha");
  React.useEffect(() => {
    let unlisten = history.listen(({ action, location }) => {
      const newStory = location.search.replace("?path=", "");
      if (newStory !== activeStory) {
        setActiveStory(newStory);
      }
    });
    return () => {
      unlisten();
    };
  });
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
      <Suspense fallback={null}>
        {React.createElement(stories[activeStory].component)}
      </Suspense>
    </div>
  );
};

export default App;
