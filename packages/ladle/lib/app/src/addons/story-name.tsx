import React from "react";
import { ChevronRight, Circle } from "../icons";
import { parseStoryTitle } from "../utils/story";

interface StoryNameProps {
  title: string;
}

export const StoryName: React.FC<StoryNameProps> = ({ title }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(title);
  };
  const parsedStoryTitle = parseStoryTitle(title);

  return (
    <button
      aria-label="Copy Story Link"
      onClick={handleClick}
      className="ladle-addons-story-title"
    >
      <Circle className="ladle-addons-story-icon" />
      {parsedStoryTitle.map((title, i) => (
        <React.Fragment key={`${title}${i}`}>
          {title}
          {i !== parsedStoryTitle.length - 1 && (
            <ChevronRight className="ladle-addons-story-divider" />
          )}
        </React.Fragment>
      ))}
    </button>
  );
};
