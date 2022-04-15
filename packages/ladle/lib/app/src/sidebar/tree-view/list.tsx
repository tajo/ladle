import React, { useCallback } from "react";
import { StoryTree, UpdateStory } from "../../../../shared/types";
import {
  OnTreeItemExpand,
  OnTreeItemKeyDown,
  OnTreeItemRef,
  OnTreeItemSelect,
  TreeViewItem,
} from "./item";
import { TreeItemRefs } from "./tree";

export const NavigationSection: React.FC<{
  tree: StoryTree;
  fullTree: StoryTree;
  story: string;
  updateStory: UpdateStory;
  selectedItemId: string | null;
  onItemKeyDown: OnTreeItemKeyDown;
  onItemExpand: OnTreeItemExpand;
  onItemSelect: OnTreeItemSelect;
  treeItemRefs: TreeItemRefs;
  depth?: number;
}> = ({
  tree,
  fullTree,
  story,
  updateStory,
  onItemKeyDown,
  onItemExpand,
  onItemSelect,
  selectedItemId,
  treeItemRefs,
  depth = 0,
}) => {
  const handleItemRef = useCallback<OnTreeItemRef>((element, { id }) => {
    treeItemRefs.current[id] = element;
  }, []);

  return (
    <React.Fragment>
      {tree.map((treeItem) => (
        <TreeViewItem
          key={treeItem.id}
          isActive={treeItem.id === story}
          treeItem={treeItem}
          depth={depth}
          onRef={handleItemRef}
          onKeyDown={onItemKeyDown}
          onSelect={onItemSelect}
          onExpand={onItemExpand}
        >
          {treeItem.children.length > 0 && treeItem.isExpanded && (
            <ul role="group" className="ladle-tree-view-children">
              <NavigationSection
                tree={treeItem.children}
                fullTree={fullTree}
                story={story}
                updateStory={updateStory}
                selectedItemId={selectedItemId}
                onItemExpand={onItemExpand}
                onItemKeyDown={onItemKeyDown}
                onItemSelect={onItemSelect}
                treeItemRefs={treeItemRefs}
                depth={depth + 1}
              />
            </ul>
          )}
        </TreeViewItem>
      ))}
    </React.Fragment>
  );
};
