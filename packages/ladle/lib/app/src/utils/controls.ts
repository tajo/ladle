export const isAnyControlValuePreSet = (): boolean => {
  return document.location.search.includes("arg-");
};
