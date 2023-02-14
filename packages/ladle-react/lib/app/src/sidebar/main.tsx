import * as React from "react";
import TreeView from "./tree-view";
import type { UpdateStory } from "../../../shared/types";

const Main = ({
  stories,
  story,
  updateStory,
}: {
  stories: string[];
  story: string;
  updateStory: UpdateStory;
}) => {
  const [search, setSearch] = React.useState("");
  const searchEl = React.useRef(null);
  const treeRoot = React.useRef<HTMLUListElement | null>(null);
  const openStorySelector = (zEvent: any) => {
    if ((zEvent.metaKey && zEvent.key === "p") || zEvent.key === "/") {
      if (
        ["input", "textarea"].every(
          (el) => zEvent.target.tagName.toLowerCase() !== el,
        ) ||
        zEvent.metaKey
      ) {
        (searchEl.current as any as HTMLInputElement).focus();
        zEvent.preventDefault();
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", openStorySelector);
    return () => {
      document.removeEventListener("keydown", openStorySelector);
    };
  }, []);
  const canonicalSearch = search
    .toLocaleLowerCase()
    .replace(new RegExp("\\s+", "g"), "-");

  const filteredStories = stories.filter((story) =>
    story.includes(canonicalSearch),
  );

  return (
    <nav role="navigation" className="ladle-aside">
      <input
        placeholder="Search"
        aria-label="Search stories"
        value={search}
        ref={searchEl}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            (treeRoot as any).current.firstChild.focus();
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <TreeView
        searchRef={searchEl}
        stories={filteredStories}
        story={story}
        updateStory={updateStory}
        searchActive={search !== ""}
        setTreeRootRef={(root: HTMLUListElement | null) =>
          (treeRoot.current = root)
        }
      />
    </nav>
  );
};

export default Main;
