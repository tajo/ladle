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

export type ServeParamsT = {
  port: number;
  hotPort: number;
  cacheDir: string;
};

export type BuildParamsT = {
  cacheDir: string;
  outDir: string;
};
