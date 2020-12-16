import * as React from "react";

const Extensions: React.FC<{}> = () => (
  <aside className="fstbk-extensions">
    <ul>
      <li
        onClick={() => {
          const currentTheme = localStorage.getItem("theme");
          const prefersDarkScheme = window.matchMedia(
            "(prefers-color-scheme: dark)"
          );

          if (currentTheme !== "light" && currentTheme !== "dark") {
            if (prefersDarkScheme.matches) {
              document.documentElement.setAttribute("data-theme", "light");
              localStorage.setItem("theme", "light");
            } else {
              document.documentElement.setAttribute("data-theme", "dark");
              localStorage.setItem("theme", "dark");
            }
          } else if (currentTheme === "light") {
            if (prefersDarkScheme.matches) {
              document.documentElement.removeAttribute("data-theme");
              localStorage.removeItem("theme");
            } else {
              document.documentElement.setAttribute("data-theme", "dark");
              localStorage.setItem("theme", "dark");
            }
          } else {
            if (prefersDarkScheme.matches) {
              document.documentElement.setAttribute("data-theme", "light");
              localStorage.setItem("theme", "light");
            } else {
              document.documentElement.removeAttribute("data-theme");
              localStorage.removeItem("theme");
            }
          }
        }}
      >
        D
      </li>
      <li>B</li>
      <li>C</li>
    </ul>
  </aside>
);

export default Extensions;
