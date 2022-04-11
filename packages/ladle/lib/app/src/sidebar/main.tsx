import * as React from "react";
import TreeView from "./tree-view";
import type { UpdateStory } from "../../../shared/types";
import SearchInput from "./search";

const Main: React.FC<{
  stories: string[];
  story: string;
  updateStory: UpdateStory;
}> = ({ stories, story, updateStory }) => {
  const [search, setSearch] = React.useState("");
  const searchEl = React.useRef(null);
  const treeRoot = React.useRef<HTMLUListElement | null>(null);

  const canonicalSearch = search
    .toLocaleLowerCase()
    .replace(new RegExp("\\s+", "g"), "-");

  const filteredStories = stories.filter((story) =>
    story.includes(canonicalSearch),
  );

  return (
    <aside data-ladle className="ladle-aside">
      <SearchInput
        ref={searchEl}
        inputRef={searchEl}
        onChange={setSearch}
        treeRoot={treeRoot}
        value={search}
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
    </aside>
  );
};

export default Main;
