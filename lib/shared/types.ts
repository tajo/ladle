type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export enum ModeState {
  Full = "full",
  Preview = "preview",
}

export enum ThemeState {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export type GlobalState = {
  mode: ModeState;
  theme: ThemeState;
  story: string;
};

export enum Output {
  Dashboard = "dashboard",
  Stream = "stream",
}

export type StoryTree = {
  [key: string]: {
    id: string;
    name: string;
    isLinkable: boolean;
    children: StoryTree;
  };
};

export type GeneratedStories = {
  [key: string]: {
    component: React.FC;
  };
};

export type DevParams = {
  stories: string;
  port: number;
  theme: ThemeState;
  output: Output;
  open: string;
};

export type BuildParams = {
  stories: string;
  out: string;
  theme: ThemeState;
  sourcemap: boolean;
  baseUrl: string;
  optimize: boolean;
};

export type PluginOptions = {
  storyGlob: string;
};

export type Config = {
  stories: string;
  mount: string[];
  addons: {
    theme: {
      enabled: boolean;
      defaultState: ThemeState;
    };
    mode: {
      enabled: boolean;
      defaultState: ModeState;
    };
  };
  serve: {
    open: string;
    port: number;
    output: Output;
  };
  build: {
    out: string;
    sourcemap: boolean;
    baseUrl: string;
    optimize: boolean;
  };
};

export type UserConfig = RecursivePartial<Config>;
