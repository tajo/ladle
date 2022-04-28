type WatcherT = () => void;

export const watchers: WatcherT[] = [];
export const storyUpdated = () => {
  watchers.forEach((watcher) => watcher());
};
