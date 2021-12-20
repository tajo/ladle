export default function composeDecorators(module: any, storyName: string) {
  let funcs: any[] = [];
  if (module[storyName] && Array.isArray(module[storyName].decorators)) {
    funcs = [...funcs, ...module[storyName].decorators];
  }
  if (module.default && Array.isArray(module.default.decorators)) {
    funcs = [...funcs, ...module.default.decorators];
  }
  if (funcs.length === 0) {
    console.log("no fns");
    return module[storyName];
  }
  if (funcs.length === 1) {
    return () => funcs[0](module[storyName]);
  }
  return () =>
    funcs.reduceRight(
      (a, b) =>
        (...args: any) =>
          a(() => b(...args)),
    )(module[storyName]);
}
