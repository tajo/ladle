import * as React from "react";
import cx from "classnames";
import { getHref } from "../history";
import { Page, Down } from "../icons";
import clonedeep from "lodash.clonedeep";
import { getStoryTree } from "../story-name";
import type {
  StoryTree,
  StoryTreeItem,
  UpdateStory,
} from "../../../shared/types";

const TreeView: React.FC<{
  stories: string[];
  story: string;
  updateStory: UpdateStory;
  searchActive?: boolean;
}> = ({ stories, story, updateStory, searchActive }) => {
  const [tree, setTree] = React.useState(
    getStoryTree(stories, story, searchActive)
  );
  React.useEffect(() => {
    setTree(getStoryTree(stories, story, searchActive));
  }, [stories]);
  const expandTreeItem = (itemId: string, value: boolean) => {
    const newTree = clonedeep(tree);
    const walkTree = (
      _tree: StoryTree,
      levels: string[],
      fn: (item: StoryTreeItem) => void,
      leafOnly: boolean
    ) => {
      const key = levels[0];
      if (key) {
        const item = _tree.find((item) => item.subId === key);
        if (item) {
          if (!leafOnly || levels.length === 1) {
            fn(item);
          }
          walkTree(item.children, levels.slice(1), fn, leafOnly);
        }
      }
    };
    walkTree(
      newTree,
      itemId.split("--"),
      (item) => (item.isExpanded = value),
      !value
    );
    setTree(newTree);
  };
  return (
    <ul role="tree" style={{ marginInlineStart: "-6px" }}>
      <NavigationSection
        tree={tree}
        story={story}
        updateStory={updateStory}
        expandTreeItem={expandTreeItem}
      />
    </ul>
  );
};

const Link: React.FC<{
  href: string;
  children: React.ReactNode;
  updateStory: UpdateStory;
  story: string;
}> = ({ href, children, updateStory, story }) => (
  <a
    tabIndex={0}
    role="treeitem"
    href={href}
    onClick={(e) => {
      e.preventDefault();
      updateStory(story);
    }}
  >
    {children}
  </a>
);

const NavigationSection: React.FC<{
  tree: StoryTree;
  story: string;
  updateStory: UpdateStory;
  expandTreeItem: (id: string, value: boolean) => void;
}> = ({ tree, story, updateStory, expandTreeItem }) => {
  return (
    <React.Fragment>
      {tree.map((treeProps) => {
        return (
          <li
            aria-expanded={treeProps.isExpanded}
            tabIndex={treeProps.isLinkable ? -1 : 0}
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
                <Link
                  href={getHref({ story: treeProps.id })}
                  story={treeProps.id}
                  updateStory={updateStory}
                >
                  {treeProps.name}
                </Link>
              </div>
            ) : (
              <div
                style={{ display: "flex", cursor: "pointer" }}
                onClick={() =>
                  expandTreeItem(treeProps.id, !treeProps.isExpanded)
                }
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
                    story={story}
                    updateStory={updateStory}
                    expandTreeItem={expandTreeItem}
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
