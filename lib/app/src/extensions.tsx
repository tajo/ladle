import * as React from "react";
import { Bulb } from "./icons";

const Extensions: React.FC<{}> = () => (
  <aside className="ladle-extensions">
    <ul>
      <li>
        <button
          aria-label="Switch between light and dark themes"
          title="Switch between light and dark themes"
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
          <Bulb />
        </button>
      </li>
    </ul>
  </aside>
);

export default Extensions;
