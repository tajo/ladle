// a separate non-react script, to ensure this is executed asap
import debug from "./debug";
import { storyIdToTitle, getQueryStory } from "./story-name";
import { getQuery as getQueryTheme } from "./addons/theme";
import { ThemeState } from "../../shared/types";

const title = storyIdToTitle(getQueryStory(location.search));
debug(`Initial document.title: ${title}`);
document.title = `${title} | Ladle`;

const theme = getQueryTheme(location.search);
debug(`Initial theme state: ${theme}`);

if (theme === ThemeState.Auto) {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", ThemeState.Dark);
  } else {
    document.documentElement.setAttribute("data-theme", ThemeState.Light);
  }
} else {
  document.documentElement.setAttribute("data-theme", theme);
}
