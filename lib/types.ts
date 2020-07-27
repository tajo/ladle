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
