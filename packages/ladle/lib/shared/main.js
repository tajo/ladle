export { default as serve } from "../cli/serve.js";
export { default as build } from "../cli/build.js";

export const ModeState = /** @type {import("./types").ModeState} */ (
  /** @type any */ ({
    Full: "full",
    Preview: "preview",
    SingleScroll: "single-scroll",
  })
);

export const ThemeState = /** @type {import("./types").ThemeState} */ (
  /** @type any */ ({
    Light: "light",
    Dark: "dark",
    Auto: "auto",
  })
);

export const ActionType = /** @type {import("./types").ActionType} */ (
  /** @type any */ ({
    UpdateAll: "update-all",
    UpdateMode: "update-mode",
    UpdateRtl: "update-rtl",
    UpdateStory: "update-story",
    UpdateTheme: "update-theme",
  })
);
