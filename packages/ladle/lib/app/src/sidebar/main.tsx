import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import cx from "classnames";
import config from "../get-config";
import TreeView from "./tree-view";
import { getSettings, updateSettings } from "../local-storage";
import type { UpdateStory } from "../../../shared/types";

const DEFAULT_WIDTH = 240;
const MIN_WIDTH = 192;
const MAX_WIDTH = 720;

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
  const [width, setWidth] = React.useState(
    getSettings().sidebarWidth || DEFAULT_WIDTH,
  );
  const [resizeActive, setResizeActive] = React.useState(false);
  const handleRef = React.useRef<HTMLDivElement>(null);
  const searchEl = React.useRef(null);
  const treeRoot = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    const parentStyles = window.getComputedStyle(
      // @ts-ignore
      handleRef.current.parentElement,
    );
    const direction = parentStyles.getPropertyValue("flex-direction");
    if (direction === "row-reverse") {
      document.documentElement.setAttribute("data-reversed", "");
    }
  }, []);

  React.useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!resizeActive) {
        return;
      }
      setWidth((previousWidth) => {
        const newWidth = document.documentElement.hasAttribute("data-reversed")
          ? previousWidth + e.movementX
          : previousWidth - e.movementX;
        if (newWidth < MIN_WIDTH) {
          updateSettings({ sidebarWidth: MIN_WIDTH });
          return MIN_WIDTH;
        }
        if (newWidth > MAX_WIDTH) {
          updateSettings({ sidebarWidth: MAX_WIDTH });
          return MAX_WIDTH;
        }
        updateSettings({ sidebarWidth: newWidth });
        return newWidth;
      });
    };
    const mouseUpHandler = () => {
      if (resizeActive) {
        document.body.style.cursor = "auto";
        setResizeActive(false);
      }
    };
    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", mouseUpHandler);
    return () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", mouseUpHandler);
    };
  }, [resizeActive, setResizeActive, setWidth, handleRef.current]);

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
    <>
      <div
        ref={handleRef}
        className={cx("ladle-resize-handle", {
          "ladle-resize-active": resizeActive,
        })}
        onDragStart={(e) => e.preventDefault()}
        onDragEnd={(e) => e.preventDefault()}
        onDrop={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => e.preventDefault()}
        onDragLeave={(e) => e.preventDefault()}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!resizeActive) {
            document.body.style.cursor = "col-resize";
            setResizeActive(true);
          }
        }}
      />
      <nav
        role="navigation"
        className="ladle-aside"
        style={{ minWidth: `${width}px` }}
      >
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
    </>
  );
};

export default Main;
