const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
} else if (currentTheme == "light") {
  document.documentElement.setAttribute("data-theme", "light");
}
