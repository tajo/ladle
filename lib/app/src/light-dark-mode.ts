// @ts-ignore
console.log(window.matchMedia("(prefers-color-scheme: dark)"));
const buildTheme = import.meta.env.SNOWPACK_PUBLIC_LADLE_THEME;
const currentTheme = localStorage.getItem("ladle_theme");
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
