import * as React from "react";

const Extensions: React.FC<{}> = () => (
  <aside className="ladle-extensions">
    <ul>
      <li
        onClick={() => {
          if (localStorage.getItem("ladle_theme") === "light") {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("ladle_theme", "dark");
          } else {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("ladle_theme", "light");
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
