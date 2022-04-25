export const parseStoryTitle = (storyTitle: string): string[] => {
  return storyTitle.split("--").map((part) => {
    const capitalized = part.charAt(0).toUpperCase() + part.substring(1);
    return capitalized.replace(/-/g, " ");
  });
};
