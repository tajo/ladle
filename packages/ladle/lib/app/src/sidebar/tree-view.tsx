import * as React from "react";
import cx from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import config from "../get-config";
import { getHref } from "../history";
import { Page, Down } from "../icons";
import { getStoryTree } from "../story-name";
import {
  getEndId,
  getFirstChildId,
  getFirstLink,
  getSubtree,
  getNextId,
  getParentId,
  getPrevId,
  toggleIsExpanded,
} from "./utils";
import type {
  StoryTree,
  StoryTreeItem,
  UpdateStory,
} from "../../../shared/types";

type TreeItemRefs = {
  current: { [key: string]: HTMLElement | null };
};

const TreeView = ({
  stories,
  story,
  updateStory,
  searchActive,
  searchRef,
  setTreeRootRef,
  hotkeys,
}: {
  stories: string[];
  story: string;
  searchRef: React.Ref<HTMLInputElement>;
  updateStory: UpdateStory;
  setTreeRootRef: (root: HTMLUListElement | null) => void;
  searchActive?: boolean;
  hotkeys: boolean;
}) => {
  const treeItemRefs: TreeItemRefs = React.useRef({});
  const [tree, setTree] = React.useState(
    getStoryTree(stories, story, searchActive),
  );
  React.useEffect(() => {
    setTree(getStoryTree(stories, story, searchActive));
  }, [stories.join(",")]);

  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(
    tree.length ? tree[0].id : null,
  );

  const focusSelectedItem = (id: string | null) => {
    if (id && treeItemRefs && treeItemRefs.current[id]) {
      treeItemRefs.current[id]?.focus();
    }
    setSelectedItemId(id ? id : tree[0].id);
    !id && (searchRef as any).current.focus();
  };
  const hotkeyStoryTransition = (story?: string) => {
    if (story) {
      updateStory(story);
      setTree(getStoryTree(stories, story, searchActive));
      setTimeout(() => focusSelectedItem(story), 1);
    }
  };
  useHotkeys(
    config.hotkeys.nextStory,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      hotkeyStoryTransition(stories[currentIndex + 1]);
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousStory,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      hotkeyStoryTransition(stories[currentIndex - 1]);
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.nextComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex + 1; i < stories.length; i++) {
        const parts = stories[i].split("--");
        if (parts[parts.length - 2] !== componentPart) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  useHotkeys(
    config.hotkeys.previousComponent,
    () => {
      const currentIndex = stories.findIndex((s) => s === story);
      const storyParts = stories[currentIndex].split("--");
      const componentPart = storyParts[storyParts.length - 2];
      for (let i = currentIndex - 1; i >= 0; i--) {
        const parts = stories[i].split("--");
        const prevParts = i > 0 ? stories[i - 1].split("--") : ["", ""];
        if (
          parts[parts.length - 2] !== componentPart &&
          prevParts[prevParts.length - 2] !== parts[parts.length - 2]
        ) {
          hotkeyStoryTransition(stories[i]);
          return;
        }
      }
    },
    { preventDefault: true, enableOnFormTags: true, enabled: hotkeys },
  );
  const onKeyDownFn = (
    e: React.KeyboardEvent<HTMLElement>,
    item: StoryTreeItem,
  ) => {
    if (e.metaKey || e.ctrlKey || e.altKey) {
      return;
    }
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        e.stopPropagation();
        if (!item.isExpanded) {
          setTree(toggleIsExpanded(tree, item));
        } else {
          focusSelectedItem(getFirstChildId(tree, item.id));
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        e.stopPropagation();
        if (item.isExpanded) {
          setTree(toggleIsExpanded(tree, item));
        } else {
          focusSelectedItem(getParentId(tree, item.id, null));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        e.stopPropagation();
        focusSelectedItem(getPrevId(tree, item.id, null));
        break;
      case "ArrowDown": {
        e.preventDefault();
        e.stopPropagation();
        const nextId = getNextId(tree, item.id, null);
        nextId && focusSelectedItem(nextId);
        break;
      }
      case " ":
      case "Enter":
        if (!(e.target as any).href) {
          e.preventDefault();
          e.stopPropagation();
          setTree(toggleIsExpanded(tree, item));
        }
        break;
      case "Home":
        e.preventDefault();
        e.stopPropagation();
        if (tree.length) {
          focusSelectedItem(tree[0].id);
        }
        break;
      case "End":
        e.preventDefault();
        e.stopPropagation();
        focusSelectedItem(getEndId(tree));
        break;
    }
  };
  return (
    <ul
      role="tree"
      style={{ marginInlineStart: "-6px" }}
      ref={(el) => setTreeRootRef(el)}
    >
      <NavigationSection
        tree={tree}
        fullTree={tree}
        story={story}
        updateStory={updateStory}
        onItemClick={(item: StoryTreeItem) => {
          const newTree = toggleIsExpanded(tree, item);
          const firstChildLink = getFirstLink(
            getSubtree(newTree, item.id),
            item.id,
          );
          firstChildLink &&
            story !== firstChildLink.id &&
            firstChildLink.isExpanded &&
            updateStory(firstChildLink.id);
          setTree(newTree);
        }}
        selectedItemId={selectedItemId}
        onKeyDownFn={onKeyDownFn}
        treeItemRefs={treeItemRefs}
      />
    </ul>
  );
};

const NavigationSection = ({
  tree,
  fullTree,
  story,
  updateStory,
  onItemClick,
  onKeyDownFn,
  selectedItemId,
  treeItemRefs,
}: {
  tree: StoryTree;
  fullTree: StoryTree;
  story: string;
  updateStory: UpdateStory;
  onKeyDownFn: (
    e: React.KeyboardEvent<HTMLElement>,
    item: StoryTreeItem,
  ) => void;
  selectedItemId: string | null;
  onItemClick: (item: StoryTreeItem) => void;
  treeItemRefs: TreeItemRefs;
}) => {
  return (
    <React.Fragment>
      {tree.map((treeProps) => {
        return (
          <li
            onDragStart={(e) => e.preventDefault()}
            onKeyDown={(e) => onKeyDownFn(e, treeProps)}
            aria-expanded={treeProps.isExpanded}
            title={treeProps.name}
            tabIndex={
              treeProps.id === selectedItemId && !treeProps.isLinkable ? 0 : -1
            }
            ref={
              treeProps.isLinkable
                ? undefined
                : (element) => (treeItemRefs.current[treeProps.id] = element)
            }
            role="treeitem"
            key={treeProps.id}
            className={cx({
              "ladle-linkable": treeProps.isLinkable,
              "ladle-active": treeProps.id === story,
            })}
            style={!treeProps.isLinkable ? { marginTop: "0.5em" } : {}}
          >
            {treeProps.isLinkable ? (
              <div style={{ display: "flex" }}>
                <Page />
                <a
                  tabIndex={treeProps.id === selectedItemId ? 0 : -1}
                  ref={(element) =>
                    (treeItemRefs.current[treeProps.id] = element)
                  }
                  href={getHref({ story: treeProps.id })}
                  onKeyDown={(e) =>
                    story !== treeProps.id && onKeyDownFn(e, treeProps)
                  }
                  onClick={(e) => {
                    if (!e.ctrlKey && !e.metaKey) {
                      e.preventDefault();
                      story !== treeProps.id && updateStory(treeProps.id);
                    }
                  }}
                >
                  {treeProps.name}
                </a>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                }}
                title={treeProps.name}
                onClick={() => onItemClick(treeProps)}
              >
                <Down rotate={!treeProps.isExpanded} />
                <div
                  style={{
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {treeProps.name}
                </div>
              </div>
            )}
            {Object.keys(treeProps.children).length > 0 &&
              treeProps.isExpanded && (
                <ul role="group">
                  <NavigationSection
                    tree={treeProps.children}
                    fullTree={fullTree}
                    story={story}
                    updateStory={updateStory}
                    selectedItemId={selectedItemId}
                    onKeyDownFn={onKeyDownFn}
                    onItemClick={onItemClick}
                    treeItemRefs={treeItemRefs}
                  />
                </ul>
              )}
          </li>
        );
      })}
    </React.Fragment>
  );
};

export default TreeView;
