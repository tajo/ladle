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

export type StoryTreeItem = {
  id: string;
  subId: string;
  name: string;
  isLinkable: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  children: StoryTree;
};

export type StoryTree = StoryTreeItem[];

export type GeneratedStories = {
  [key: string]: {
    component: React.FC;
  };
};

export type DevParams = {
  stories?: string;
  root?: string;
  port?: number;
  theme?: ThemeState;
  babelPresets?: any[];
  babelPlugins?: any[];
  output?: Output;
  open?: string;
  config?: string;
};

export type BuildParams = {
  stories?: string;
  root?: string;
  out?: string;
  theme?: ThemeState;
  babelPresets?: any[];
  babelPlugins?: any[];
  sourcemap?: boolean;
  baseUrl?: string;
  config?: string;
};

export type PluginOptions = {
  storyGlob: string;
  configFolder: string;
};

export type Config = {
  stories: string;
  root: string;
  defaultStory: string;
  babelPlugins: any[];
  babelPresets: any[];
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
    ladle: {
      enabled: boolean;
    };
  };
  serve: {
    open: string;
    port: number;
    output: string;
  };
  build: {
    out: string;
    sourcemap: boolean | "hidden" | "inline" | undefined;
    baseUrl: string;
  };
};

export type UserConfig = RecursivePartial<Config>;

export type ParsedStoriesResult = {
  entry: string;
  stories: {
    storyId: string;
    componentName: string;
    namedExport: string;
  }[];
  exportDefaultProps: {
    title?: string;
    parameters: any;
  };
  namedExportToParameters: { [key: string]: any };
  namedExportToStoryName: { [key: string]: string };
  storyParams: { [key: string]: { title?: string; parameters: any } };
  fileId: string;
};

export type EntryData = {
  [key: string]: ParsedStoriesResult;
};
