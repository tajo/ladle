import type { UserConfig as ViteUserConfig } from "vite";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ActionState = any[];

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

export enum ControlType {
  Boolean = "boolean",
  String = "string",
  Number = "number",
  Complex = "complex",
  Function = "function",
  Radio = "radio",
  InlineRadio = "inline-radio",
  Select = "select",
  MultiSelect = "multi-select",
  Check = "check",
  InlineCheck = "inline-check",
  Action = "action",
}

export type ControlState = {
  [key: string]: {
    description?: string;
    defaultValue?: any;
    options?: string[];
    value: any;
    type?: ControlType;
  };
};

export enum ActionType {
  UpdateAll = "update-all",
  UpdateMode = "update-mode",
  UpdateAction = "update-action",
  UpdateRtl = "update-rtl",
  UpdateSource = "update-source",
  UpdateStory = "update-story",
  UpdateTheme = "update-theme",
  UpdateWidth = "update-width",
  UpdateControl = "update-control",
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
      type: ActionType.UpdateAction;
      clear: boolean;
      value: any;
    }
  | {
      type: ActionType.UpdateRtl;
      value: boolean;
    }
  | {
      type: ActionType.UpdateSource;
      value: boolean;
    }
  | {
      type: ActionType.UpdateWidth;
      value: number;
    }
  | {
      type: ActionType.UpdateStory;
      value: string;
    }
  | {
      type: ActionType.UpdateTheme;
      value: ThemeState;
    }
  | {
      type: ActionType.UpdateControl;
      value: ControlState;
    };

export type GlobalState = {
  mode: ModeState;
  theme: ThemeState;
  action: ActionState;
  story: string;
  rtl: boolean;
  source: boolean;
  control: ControlState;
  width: number;
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

export type StoryDecorator = (
  Story: React.FC,
  context: StoryProps,
) => React.ReactElement;

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

export type CLIParams = Partial<Config> & {
  theme?: ThemeState;
  config?: string;
};

export type PluginOptions = {
  storyGlob: string;
  configFolder: string;
};

export type Config = {
  stories: string;
  defaultStory: string;
  appendToHead: string;
  viteConfig?: string;
  port: number;
  previewPort: number;
  outDir: string;
  base?: string;
  mode?: string;
  addons: {
    control: {
      enabled: boolean;
      defaultState: ControlState;
    };
    theme: {
      enabled: boolean;
      defaultState: ThemeState;
    };
    mode: {
      enabled: boolean;
      defaultState: ModeState;
    };
    action: {
      enabled: boolean;
      defaultState: ActionState;
    };
    rtl: {
      enabled: boolean;
      defaultState: boolean;
    };
    source: {
      enabled: boolean;
      defaultState: boolean;
    };
    a11y: {
      enabled: boolean;
    };
    ladle: {
      enabled: boolean;
    };
    width: {
      enabled: boolean;
      options: { [key: string]: number };
      defaultState: number;
    };
  };
};

export type UserConfig = RecursivePartial<Config>;
export type StoryEntry = {
  storyId: string;
  componentName: string;
  namedExport: string;
  locStart: number;
  locEnd: number;
};
export type ParsedStoriesResult = {
  entry: string;
  stories: StoryEntry[];
  exportDefaultProps: {
    title?: string;
    meta: any;
  };
  namedExportToMeta: { [key: string]: any };
  namedExportToStoryName: { [key: string]: string };
  storyParams: { [key: string]: { title?: string; meta: any } };
  fileId: string;
  storySource: string;
};

export type GetUserViteConfig = {
  userViteConfig: ViteUserConfig;
  hasReactPlugin: boolean;
  hasTSConfigPathPlugin: boolean;
};

export type EntryData = {
  [key: string]: ParsedStoriesResult;
};
