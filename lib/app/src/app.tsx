import * as React from "react";
//@ts-ignore
import { stories } from "./generated-list";
import Story from "./story";
import Navigation from "./navigation";
import AddonPanel from "./addon-panel";
import history from "./history";
import { ModeState, Config, GlobalState } from "../../shared/types";
import debug from "./debug";
import { getQuery as getQueryTheme } from "./addons/theme";
import { getQuery as getQueryMode } from "./addons/mode";
import { getQueryStory, storyIdToTitle, isQueryStorySet } from "./story-name";

debug(`Stories: ${Object.keys(stories)}`);

const App: React.FC<{ config: Config }> = ({ config }) => {
  const [theme, setTheme] = React.useState(getQueryTheme(location.search));
  const [mode, setMode] = React.useState(getQueryMode(location.search));
  const [story, setStory] = React.useState(getQueryStory(location.search));
  const globalState: GlobalState = {
    theme,
    mode,
    story,
  };
  React.useEffect(() => {
    if (!isQueryStorySet(location.search)) {
      debug(`No story is selected. Auto-selecting the first story: ${story}`);
      history.push(`?story=${story}`);
    }
    const unlisten = history.listen(({ location }) => {
      const nextStory = getQueryStory(location.search);
      if (story !== nextStory) {
        document.title = `${storyIdToTitle(nextStory)} | Ladle`;
        setStory(nextStory);
      }
      const nextMode = getQueryMode(location.search);
      if (mode !== nextMode) {
        setMode(nextMode);
      }
      const nextTheme = getQueryTheme(location.search);
      if (theme !== nextTheme) {
        document.documentElement.setAttribute("data-theme", nextTheme);
        setTheme(nextTheme);
      }

      debug(
        `Setting query params: story = ${nextStory}, mode = ${nextMode}, theme = ${nextTheme}`
      );
    });
    return () => {
      unlisten();
    };
  }, [mode, story, theme]);

  if (mode === ModeState.Preview) {
    return <Story config={config} globalState={globalState} />;
  }
  return (
    <div className="ladle-wrapper">
      <main className="ladle-main">
        <Story config={config} globalState={globalState} />
      </main>
      {mode === ModeState.Full && (
        <>
          <Navigation stories={Object.keys(stories)} story={story} />
          <AddonPanel config={config} globalState={globalState} />
        </>
      )}
    </div>
  );
};

export default App;
