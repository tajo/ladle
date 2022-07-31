import { FC, Ref, useCallback, useEffect, useRef, useState } from "react";
import { StoryTreeItem, UpdateStory } from "../../../../shared/types";
import { Package } from "../../icons";
import { getStoryTree } from "../../story-name";
import {
  getEndId,
  getFirstChildId,
  getNextId,
  getParentId,
  getPrevId,
  toggleIsExpanded,
} from "../utils";
import { OnTreeItemExpand, OnTreeItemKeyDown, OnTreeItemSelect } from "./item";
import { NavigationSection } from "./list";

export type TreeItemRefs = {
  current: { [key: string]: HTMLElement | null };
};

export const TreeView: FC<{
  stories: string[];
  story: string;
  searchRef: Ref<HTMLLinkElement>;
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
  const treeItemRefs: TreeItemRefs = useRef({});
  const [tree, setTree] = useState(getStoryTree(stories, story, searchActive));
  useEffect(() => {
    setTree(getStoryTree(stories, story, searchActive));
  }, [stories.join(",")]);

  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    tree.length ? tree[0].id : null,
  );

  const focusSelectedItem = useCallback((id: string | null) => {
    if (id && treeItemRefs && treeItemRefs.current[id]) {
      treeItemRefs.current[id]?.focus();
    }

    setSelectedItemId(id ? id : tree[0].id);
    !id && (searchRef as any).current.focus();
  }, []);
  const handleItemKeyDown = useCallback<OnTreeItemKeyDown>(
    (e: React.KeyboardEvent<HTMLElement>, item: StoryTreeItem) => {
      const preventAllEvents = () => {
        e.preventDefault();
        e.stopPropagation();
      };

      switch (e.key) {
        case "ArrowRight":
          preventAllEvents();

          if (!item.isExpanded) {
            setTree((prevTree) => toggleIsExpanded(prevTree, item));
          } else {
            focusSelectedItem(getFirstChildId(tree, item.id));
          }

          break;
        case "ArrowLeft":
          preventAllEvents();

          if (item.isExpanded) {
            setTree(toggleIsExpanded(tree, item));
          } else {
            focusSelectedItem(getParentId(tree, item.id, null));
          }
          break;
        case "ArrowUp":
          preventAllEvents();

          focusSelectedItem(getPrevId(tree, item.id, null));
          break;
        case "ArrowDown":
          preventAllEvents();

          const nextId = getNextId(tree, item.id, null);
          nextId && focusSelectedItem(nextId);
          break;
        case " ":
        case "Enter":
          if (!(e.target as any).href) {
            preventAllEvents();
            setTree((prevTree) => toggleIsExpanded(prevTree, item));
          }
          break;
        case "Home":
          preventAllEvents();

          if (tree.length) {
            focusSelectedItem(tree[0].id);
          }
          break;
        case "End":
          preventAllEvents();

          focusSelectedItem(getEndId(tree));
          break;
      }
    },
    [tree],
  );
  const handleItemExpand = useCallback<OnTreeItemExpand>((item) => {
    setTree((prevTree) => toggleIsExpanded(prevTree, item));
  }, []);
  const handleItemSelect = useCallback<OnTreeItemSelect>(
    ({ id }) => updateStory(id),
    [updateStory],
  );

  return (
    <ul
      className="ladle-tree-view"
      role="tree"
      ref={(el) => setTreeRootRef(el)}
    >
      <NavigationSection
        tree={tree}
        fullTree={tree}
        story={story}
        updateStory={updateStory}
        onItemExpand={handleItemExpand}
        onItemKeyDown={handleItemKeyDown}
        onItemSelect={handleItemSelect}
        selectedItemId={selectedItemId}
        treeItemRefs={treeItemRefs}
      />
      {searchActive && tree.length === 0 && (
        <div className="ladle-tree-not-found">
          <Package width="24px" />
          <h4>No components found</h4>
          <p>Find components by path or name</p>
        </div>
      )}
    </ul>
  );
};
