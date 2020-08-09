import React from "react";
import history from "./history";
import { getStoryTree } from "./story-name";
import { Page, Down } from "./icons";
import type { StoryTreeT } from "../types";

const Link: React.FC<{ href: string; children: React.ReactNode }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      history.push(href);
    }}
  >
    {children}
  </a>
);

const Navigation: React.FC<{ stories: string[] }> = ({ stories }) => (
  <aside className="fstbk-aside">
    <input placeholder="Search stories" />
    <ul style={{ margin: 0 }}>
      <NavigationSection tree={getStoryTree(stories)} />
    </ul>
  </aside>
);

const NavigationSection: React.FC<{
  tree: StoryTreeT;
}> = ({ tree }) => {
  return (
    <React.Fragment>
      {Object.keys(tree)
        .sort()
        .map((key) => {
          const treeProps = tree[key];
          return (
            <li
              key={key}
              className={treeProps.isLinkable ? "fstbk-linkable" : ""}
              style={!treeProps.isLinkable ? { marginTop: "0.5em" } : {}}
            >
              {treeProps.isLinkable ? (
                <div style={{ display: "flex" }}>
                  <Page />
                  <Link href={`?story=${treeProps.id}`}>{treeProps.name}</Link>
                </div>
              ) : (
                <div style={{ display: "flex" }}>
                  <Down />
                  <div>{treeProps.name}</div>
                </div>
              )}
              {Object.keys(treeProps.children).length > 0 && (
                <ul>
                  <NavigationSection tree={treeProps.children} />
                </ul>
              )}
            </li>
          );
        })}
    </React.Fragment>
  );
};

export default Navigation;
