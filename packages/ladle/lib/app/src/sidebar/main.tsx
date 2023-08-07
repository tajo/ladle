import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import TreeView from "./tree-view";
import type { UpdateStory } from "../../../shared/types";

const Main = ({
  stories,
  story,
  updateStory,
  hotkeys,
}: {
  stories: string[];
  story: string;
  updateStory: UpdateStory;
  hotkeys: boolean;
}) => {
  const [search, setSearch] = React.useState("");
  const searchEl = React.useRef(null);
  const treeRoot = React.useRef<HTMLUListElement | null>(null);
  useHotkeys(
    config.hotkeys.search,
    () => (searchEl.current as any as HTMLInputElement).focus(),
    { preventDefault: true, enabled: hotkeys },
  );
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
        hotkeys={hotkeys}
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
