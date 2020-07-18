import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Emittery from "emittery";

const emitter = new Emittery();

const STORY_IMPORTED = "story-imported";

const StoryA = lazy(() =>
  import("./middle.jsx").then((module) => {
    console.log(Object.keys(module.Middle));
    emitter.emit(STORY_IMPORTED, module.Middle.title);
    return { default: module.Middle };
  })
);
const StoryB = lazy(() => import("./b.jsx"));

const App = () => {
  const [dato, setData] = React.useState("empty");
  React.useEffect(() => {
    emitter.on(STORY_IMPORTED, setData);
    return () => {
      emitter.off(STORY_IMPORTED, setData);
    };
  });
  return (
    <div>
      <p>{dato}</p>
      So faasdsdtasd and lovely, alright how is it going????
      <Router>
        <Suspense fallback={<div>Loading Some Content</div>}>
          <Switch>
            <Route exact path="/" component={StoryA} />
            <Route path="/register" component={StoryB} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
