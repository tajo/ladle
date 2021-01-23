import debug from "./debug";
// @ts-ignore
const buildTheme = import.meta.env.SNOWPACK_PUBLIC_LADLE_THEME;
debug(`ENV.SNOWPACK_PUBLIC_LADLE_THEME: ${buildTheme}`);
const currentTheme = localStorage.getItem("ladle_theme");
debug(`localStorage.ladle_theme: ${currentTheme}`);
if (!currentTheme) {
  if (buildTheme === "auto") {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.setItem("ladle_theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      localStorage.setItem("ladle_theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  } else {
    localStorage.setItem("ladle_theme", buildTheme);
    document.documentElement.setAttribute("data-theme", buildTheme);
  }
} else {
  document.documentElement.setAttribute("data-theme", currentTheme);
}
