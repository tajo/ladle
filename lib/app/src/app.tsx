import * as React from "react";
import queryString from "query-string";
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

export const getQueryStory = (locationSearch: string) =>
  queryString.parse(locationSearch).story as string | undefined;

debug(`Stories: ${Object.keys(stories)}`);

const App: React.FC<{ config: Config }> = ({ config }) => {
  const firstStory = Object.keys(stories).sort()[0];
  const [theme, setTheme] = React.useState(getQueryTheme(location.search));
  const [mode, setMode] = React.useState(getQueryMode(location.search));
  const [story, setStory] = React.useState(
    getQueryStory(location.search) || firstStory
  );
  const globalState: GlobalState = {
    theme,
    mode,
    story,
  };
  React.useEffect(() => {
    if (!getQueryStory(location.search)) {
      debug(
        `No story is selected. Auto-selecting the first story: ${firstStory}`
      );
      history.push(`?story=${firstStory}`);
    }
    const unlisten = history.listen(({ location }) => {
      setStory(getQueryStory(location.search) || firstStory);
      setMode(getQueryMode(location.search));
      const nextTheme = getQueryTheme(location.search);
      if (theme !== nextTheme) {
        document.documentElement.setAttribute("data-theme", nextTheme);
        setTheme(nextTheme);
      }

      debug(
        `Setting query params: story = ${getQueryStory(
          location.search
        )}, mode = ${getQueryMode(location.search)}, theme = ${getQueryTheme(
          location.search
        )}`
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
