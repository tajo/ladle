import { lazy } from "react";

const a1haha = lazy(() => import("../../src/a1.stories.jsx").then(module => {
  return {
    default: module.Haha
  };
}));
const a1funny = lazy(() => import("../../src/a1.stories.jsx").then(module => {
  return {
    default: module.Funny
  };
}));
const a2middle = lazy(() => import("../../src/a2.stories.jsx").then(module => {
  return {
    default: module.Middle
  };
}));

export const stories = {
  "a1--haha": {
    component: a1haha,
    name: "Haha"
  },
  "a1--funny": {
    component: a1funny,
    name: "Funny"
  },
  "a2--middle": {
    component: a2middle,
    name: "Middle"
  }
};