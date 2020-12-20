import { lazy } from "react";
export const Zebra = lazy(() =>
  import("../../../src/myMama.stor_ies.js").then((module) => {
    return {
      default: module.Zebra,
    };
  })
);
export let list = ["zebra", "dog"];

if (import.meta.hot) {
  // Receive any updates from the dev server, and update accordingly.
  import.meta.hot.accept(({ module }) => {
    try {
      list = module.list;
    } catch (err) {
      // If you have trouble accepting an update, mark it as invalid (reload the page).
      console.log(err);
      import.meta.hot.invalidate();
    }
  });
}
