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
type OutputT = "dashboard" | "stream";

export type DevParamsT = {
  stories: string;
  port: number;
  theme: ThemeT;
  output: OutputT;
  open: string;
};

export type BuildParamsT = {
  stories: string;
  out: string;
  theme: ThemeT;
  sourcemap: boolean;
  baseUrl: string;
  optimize: boolean;
};

export type PluginOptionsT = {
  storyGlob: string;
};

export type ConfigT = {
  stories: string;
  theme: ThemeT;
  serve: {
    open: string;
    port: number;
    output: OutputT;
  };
  build: {
    out: string;
    sourcemap: boolean;
    baseUrl: string;
    optimize: boolean;
  };
};
