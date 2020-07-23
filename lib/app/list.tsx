import * as React from "react";
//@ts-ignore
import { stories as generatedStories } from "./generated-list";

type StoriesT = {
  [key: string]: {
    component: React.FC;
  };
};

export const stories: StoriesT = generatedStories;
