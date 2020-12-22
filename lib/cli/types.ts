export type StoryTreeT = {
  [key: string]: {
    id: string;
    name: string;
    isLinkable: boolean;
    children: StoryTreeT;
  };
};

export type GeneratedStoriesT = {
  [key: string]: {
    component: React.FC;
  };
};

export type ThemeT = "light" | "dark" | "auto";

export type DevParamsT = {
  stories: string;
  port: number;
  theme: ThemeT;
};

export type BuildParamsT = {
  stories: string;
  outDir: string;
  theme: ThemeT;
};

export type PluginOptionsT = {
  storyGlob: string;
};
