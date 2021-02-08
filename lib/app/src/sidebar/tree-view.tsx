import * as React from "react";
import cx from "classnames";
import { getHref } from "../history";
import { Page, Down } from "../icons";
import clonedeep from "lodash.clonedeep";
import { getStoryTree } from "../story-name";
import { walkTree } from "./utils";
import type { StoryTree, UpdateStory } from "../../../shared/types";

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
    onKeyDown={(e) => e.stopPropagation()}
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
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
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.code === "Space" || e.code === "Enter") {
                expandTreeItem(treeProps.id, !treeProps.isExpanded);
              }
            }}
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
