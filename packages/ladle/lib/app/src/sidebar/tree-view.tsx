import * as React from "react";
import cx from "../../deps/classnames";
import { getHref } from "../history";
import { Page, Down } from "../icons";
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
      role="tree"
      style={{ marginInlineStart: "-6px" }}
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
}> = ({
  tree,
  fullTree,
  story,
  updateStory,
  onItemClick,
  onKeyDownFn,
  selectedItemId,
  treeItemRefs,
}) => {
  return (
    <React.Fragment>
      {tree.map((treeProps) => {
        return (
          <li
            onKeyDown={(e) => onKeyDownFn(e, treeProps)}
            aria-expanded={treeProps.isExpanded}
            tabIndex={
              treeProps.id === selectedItemId && !treeProps.isLinkable ? 0 : -1
            }
            ref={
              treeProps.isLinkable
                ? undefined
                : (element) => (treeItemRefs.current[treeProps.id] = element)
            }
            role={treeProps.isLinkable ? "none" : "treeitem"}
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
                  role="treeitem"
                  href={getHref({ story: treeProps.id })}
                  onKeyDown={(e) => onKeyDownFn(e, treeProps)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateStory(treeProps.id);
                  }}
                >
                  {treeProps.name}
                </a>
              </div>
            ) : (
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() => onItemClick(treeProps)}
              >
                <Down rotate={!treeProps.isExpanded} />
                <div>{treeProps.name}</div>
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
