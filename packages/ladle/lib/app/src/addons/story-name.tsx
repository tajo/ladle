import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronRight, Circle } from "../icons";
import { parseStoryTitle } from "../utils/story";
import Tooltip from "@reach/tooltip";

interface StoryNameProps {
  title: string;
}

export const StoryName: React.FC<StoryNameProps> = ({ title }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const handleClick = () => {
    // Copy text to clipboard
    navigator.clipboard.writeText(title);

    // Show the user the text is now copied
    setHasCopied(true);

    // Set has copied to false after 3s
    timeoutRef.current = window.setTimeout(() => setHasCopied(false), 3000);
  };
  const parsedStoryTitle = parseStoryTitle(title);
  const Icon = hasCopied ? Check : Circle;

  useEffect(() => {
    setHasCopied(false);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [title]);

  return (
    <Tooltip
      label={hasCopied ? "Link Copied to Clipboard" : "Copy Story Link"}
      className="ladle-addons-story-tooltip"
    >
      <button onClick={handleClick} className="ladle-addons-story-title">
        <Icon
          className="ladle-addons-story-icon"
          data-has-copied={hasCopied ? true : undefined}
        />
        {parsedStoryTitle.map((title, i) => (
          <React.Fragment key={`${title}${i}`}>
            {title}
            {i !== parsedStoryTitle.length - 1 && (
              <ChevronRight className="ladle-addons-story-divider" />
            )}
          </React.Fragment>
        ))}
      </button>
    </Tooltip>
  );
};
