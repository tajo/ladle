import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const StoryA = lazy(() => import("./a.jsx"));
const StoryB = lazy(() => import("./b.jsx"));

const App = () => (
  <div>
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

export default App;
