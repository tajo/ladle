const getHmr = () => `if (import.meta.hot) {
  import.meta.hot.accept(({ module }) => {
    if (Object.keys(module.stories).every(item => Object.keys(stories).includes(item))) {
      stories = module.stories;
      config = module.config;
    } else {
      // full refresh when new stories are added
      // todo, can dynamic import + React Refresh work?
      import.meta.hot.invalidate();
    }
  });
}`;

module.exports = getHmr;
