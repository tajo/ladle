import type { CSSModulesOptions, Plugin } from "vite";

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

export enum ControlType {
  Boolean = "boolean",
  String = "string",
  Number = "number",
  Complex = "complex",
  Function = "function",
  Radio = "radio",
  Select = "select",
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
  UpdateRtl = "update-rtl",
  UpdateSource = "update-source",
  UpdateStory = "update-story",
  UpdateTheme = "update-theme",
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
      type: ActionType.UpdateRtl;
      value: boolean;
    }
  | {
      type: ActionType.UpdateSource;
      value: boolean;
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
  story: string;
  rtl: boolean;
  source: boolean;
  control: ControlState;
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

export type DevParams = Partial<Config> & {
  theme?: ThemeState;
  config?: string;
};
export type BuildParams = Partial<Config> & {
  theme?: ThemeState;
  config?: string;
};

export type PluginOptions = {
  storyGlob: string;
  configFolder: string;
};

/**
 * We accept not only the normal {@link Plugin} but also
 * the conditional function that returns {@link Plugin} or `null`.
 * Therefore, we can have a plugin that is conditionally enabled or disabled:
 *
 * ```js
 * {
 *   vitePlugins: [
 *     // The normal plugin.
 *     plugin(),
 *
 *     // The plugin that is returned by a function.
 *     () => process.env.ENABLE_PLUGIN === '1' && plugin(),
 *
 *     // The plugin that is returned by an asynchronous function.
 *     () => import('vite-plugin').then(({ default: plugin }) => plugin()),
 *   ],
 * }
 * ```
 */
export type VitePluginInput =
  | Plugin
  | (() => Plugin | null)
  | (() => Promise<Plugin | null>);

export type Config = {
  stories: string;
  root: string;
  publicDir: string | false;
  enableFlow: boolean;
  defaultStory: string;
  babelParserOpts: { [key: string]: any };
  babelPlugins: any[];
  babelPresets: any[];
  vitePlugins: VitePluginInput[];
  define: { [key: string]: string };
  envPrefix: string | string[];
  css: {
    modules: CSSModulesOptions;
  };
  resolve: {
    alias: { [key: string]: string };
  };
  optimizeDeps: {
    include: string[];
  };
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
    rtl: {
      enabled: boolean;
      defaultState: boolean;
    };
    source: {
      enabled: boolean;
      defaultState: boolean;
    };
    ladle: {
      enabled: boolean;
    };
  };
  serve: {
    open: string;
    port: number;
    define: { [key: string]: string };
  };
  build: {
    out: string;
    sourcemap: boolean | "hidden" | "inline" | undefined;
    baseUrl: string;
    define: { [key: string]: string };
  };
};

export type UserConfig = RecursivePartial<Config>;

export type ParsedStoriesResult = {
  entry: string;
  stories: {
    storyId: string;
    componentName: string;
    namedExport: string;
    locStart: number;
    locEnd: number;
  }[];
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

export type EntryData = {
  [key: string]: ParsedStoriesResult;
};
