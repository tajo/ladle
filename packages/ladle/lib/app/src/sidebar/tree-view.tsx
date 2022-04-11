import * as React from "react";
import cx from "classnames";
import { getHref } from "../history";
import { Folder, ChevronRight, Circle } from "../icons";
import { getStoryTree } from "../story-name";
import {
  getEndId,
  getFirstChildId,
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

const TreeView: React.FC<{
  stories: string[];
  story: string;
  searchRef: React.Ref<HTMLLinkElement>;
  updateStory: UpdateStory;
  setTreeRootRef: (root: HTMLUListElement | null) => void;
  searchActive?: boolean;
}> = ({
  stories,
  story,
  updateStory,
  searchActive,
  searchRef,
  setTreeRootRef,
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
  const onKeyDownFn = (
    e: React.KeyboardEvent<HTMLElement>,
    item: StoryTreeItem,
  ) => {
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
      case "ArrowDown":
        e.preventDefault();
        e.stopPropagation();
        const nextId = getNextId(tree, item.id, null);
        nextId && focusSelectedItem(nextId);
        break;
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
      className="ladle-tree-view"
      role="tree"
      //style={{ marginInlineStart: "-6px" }}
      ref={(el) => setTreeRootRef(el)}
    >
      <NavigationSection
        tree={tree}
        fullTree={tree}
        story={story}
        updateStory={updateStory}
        onItemClick={(item: StoryTreeItem) =>
          setTree(toggleIsExpanded(tree, item))
        }
        selectedItemId={selectedItemId}
        onKeyDownFn={onKeyDownFn}
        treeItemRefs={treeItemRefs}
      />
    </ul>
  );
};

const NavigationSection: React.FC<{
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
  depth?: number;
}> = ({
  tree,
  fullTree,
  story,
  updateStory,
  onItemClick,
  onKeyDownFn,
  selectedItemId,
  treeItemRefs,
  depth = 0,
}) => {
  return (
    <React.Fragment>
      {tree.map((treeProps) => {
        const isActive = treeProps.id === story;
        const buttonStyle = {
          paddingLeft: `${depth}rem`,
        };

        return (
          <li
            onKeyDown={(e) => onKeyDownFn(e, treeProps)}
            aria-expanded={treeProps.isExpanded}
            tabIndex={isActive && !treeProps.isLinkable ? 0 : -1}
            ref={
              treeProps.isLinkable
                ? undefined
                : (element) => (treeItemRefs.current[treeProps.id] = element)
            }
            role={treeProps.isLinkable ? "none" : "treeitem"}
            key={treeProps.id}
            className={cx("ladle-tree-view-item", {
              "ladle-linkable": treeProps.isLinkable,
              "ladle-active": treeProps.id === story,
            })}
            data-active={isActive || undefined}
            //style={!treeProps.isLinkable ? { marginTop: "0.5em" } : {}}
          >
            {treeProps.isLinkable ? (
              <a
                tabIndex={treeProps.id === selectedItemId ? 0 : -1}
                ref={(element) =>
                  (treeItemRefs.current[treeProps.id] = element)
                }
                role="treeitem"
                href={getHref({ story: treeProps.id })}
                onKeyDown={(e) => onKeyDownFn(e, treeProps)}
                onClick={(e) => {
                  if (!e.ctrlKey && !e.metaKey) {
                    e.preventDefault();
                    updateStory(treeProps.id);
                  }
                }}
                className="ladle-tree-view-button"
                style={buttonStyle}
              >
                <Circle className="ladle-tree-view-story-icon" />
                <span>{treeProps.name}</span>
              </a>
            ) : (
              <button
                className="ladle-tree-view-button"
                //style={{ display: "flex", cursor: "pointer" }}
                onClick={() => onItemClick(treeProps)}
                style={buttonStyle}
              >
                <ChevronRight
                  className="ladle-tree-view-chevron"
                  data-expanded={treeProps.isExpanded ? "true" : undefined}
                />
                <Folder className="ladle-tree-view-folder" />
                <p>{treeProps.name}</p>
              </button>
            )}
            {Object.keys(treeProps.children).length > 0 &&
              treeProps.isExpanded && (
                <ul role="group" className="ladle-tree-view-children">
                  <NavigationSection
                    tree={treeProps.children}
                    fullTree={fullTree}
                    story={story}
                    updateStory={updateStory}
                    selectedItemId={selectedItemId}
                    onKeyDownFn={onKeyDownFn}
                    onItemClick={onItemClick}
                    treeItemRefs={treeItemRefs}
                    depth={depth + 1}
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
