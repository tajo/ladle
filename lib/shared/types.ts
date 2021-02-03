type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export enum ModeState {
  Full = "full",
  Preview = "preview",
  SingleScroll = "single-scroll",
}

export enum ThemeState {
  Light = "light",
  Dark = "dark",
  Auto = "auto",
}

export enum ActionType {
  UpdateAll = "update-all",
  UpdateMode = "update-mode",
  UpdateRtl = "update-rtl",
  UpdateStory = "update-story",
  UpdateTheme = "update-theme",
}

export type GlobalAction =
  | {
      type: ActionType.UpdateAll;
      value: GlobalState;
    }
  | {
      type: ActionType.UpdateMode;
      value: ModeState;
    }
  | {
      type: ActionType.UpdateRtl;
      value: boolean;
    }
  | {
      type: ActionType.UpdateStory;
      value: string;
    }
  | {
      type: ActionType.UpdateTheme;
      value: ThemeState;
    };

export type GlobalState = {
  mode: ModeState;
  theme: ThemeState;
  story: string;
  rtl: boolean;
};

export type UpdateStory = (story: string) => void;

export type AddonProps = {
  dispatch: React.Dispatch<GlobalAction>;
  globalState: GlobalState;
};

export type StoryProps = {
  dispatch: React.Dispatch<GlobalAction>;
  globalState: GlobalState;
  config: Config;
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
  defaultStory: string;
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
    rtl: {
      enabled: boolean;
      defaultState: false;
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
