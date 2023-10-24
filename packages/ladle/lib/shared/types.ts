import type { UserConfig as ViteUserConfig } from "vite";

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export type ActionState = any[];

export type StoryOrder = string[] | ((stories: string[]) => string[]);

export enum ModeState {
  Full = "full",
  Preview = "preview",
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
  Range = "range",
  Background = "background",
}

export type ControlState = {
  [key: string]: {
    name?: string;
    description?: string;
    defaultValue?: any;
    max?: number;
    min?: number;
    step?: number;
    options?: string[];
    value: any;
    type?: ControlType;
    labels?: { [key: string]: string };
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
  UpdateControlIntialized = "update-control-initialized",
  UpdateHotkeys = "update-hotkeys",
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
      type: ActionType.UpdateHotkeys;
      value: boolean;
    }
  | {
      type: ActionType.UpdateControlIntialized;
      value: boolean;
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
  controlInitialized: boolean;
  width: number;
  hotkeys: boolean;
};

export type UpdateStory = (story: string) => void;

export type AddonProps = {
  dispatch: React.Dispatch<GlobalAction>;
  globalState: GlobalState;
};

export type StoryProps = {
  dispatch: React.Dispatch<GlobalAction>;
  globalState: GlobalState;
  parameters: { [key: string]: any };
  args: { [key: string]: any };
  argTypes: { [key: string]: any };
};

export type StoryDecorator<P = {}> = (
  Story: React.FC<Partial<P>>,
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
  storyOrder: StoryOrder;
  appendToHead: string;
  viteConfig?: string;
  host?: string;
  port: number;
  previewHost?: string;
  previewPort: number;
  outDir: string;
  base?: string;
  mode?: string;
  noWatch: boolean;
  hotkeys: {
    fullscreen: string[];
    search: string[];
    nextStory: string[];
    previousStory: string[];
    nextComponent: string[];
    previousComponent: string[];
    control: string[];
    width: string[];
    rtl: string[];
    a11y: string[];
    source: string[];
    darkMode: string[];
  };
  onDevServerStart: (serverUrl: string) => void;
  i18n: { [key: string]: string };
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
    msw: {
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
  namedExports?: string[];
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
  namedExports?: string[];
};

export type GetUserViteConfig = {
  userViteConfig: ViteUserConfig;
  hasReactPlugin: boolean;
  hasReactSwcPlugin: boolean;
  hasTSConfigPathPlugin: boolean;
};

export type EntryData = {
  [key: string]: ParsedStoriesResult;
};
