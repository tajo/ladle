import React from "react";
import cx from "classnames";
import history from "./history";
import { getStoryTree } from "./story-name";
import { Page, Down } from "./icons";
import type { StoryTreeT } from "../../cli/types";

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

const Navigation: React.FC<{ stories: string[]; activeStory: string }> = ({
  stories,
  activeStory,
}) => {
  const [search, setSearch] = React.useState("");
  const searchEl = React.useRef(null);
  const openStorySelector = (zEvent: any) => {
    if ((zEvent.metaKey && zEvent.key === "p") || zEvent.key === "/") {
      if (
        ["input", "textarea"].every(
          (el) => zEvent.target.tagName.toLowerCase() !== el
        ) ||
        zEvent.metaKey
      ) {
        ((searchEl.current as any) as HTMLInputElement).focus();
        zEvent.preventDefault();
      }
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", openStorySelector);
    return () => {
      document.removeEventListener("keydown", openStorySelector);
    };
  }, []);
  const canonicalSearch = search
    .toLocaleLowerCase()
    .replace(new RegExp("\\s+", "g"), "-");

  const filteredStories = stories.filter((story) =>
    story.includes(canonicalSearch)
  );
  return (
    <aside className="ladle-aside">
      <input
        placeholder="Search stories"
        value={search}
        ref={searchEl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <ul style={{ marginLeft: "-6px" }}>
        <NavigationSection
          tree={getStoryTree(filteredStories)}
          activeStory={activeStory}
        />
      </ul>
    </aside>
  );
};

const NavigationSection: React.FC<{
  tree: StoryTreeT;
  activeStory: string;
}> = ({ tree, activeStory }) => {
  return (
    <React.Fragment>
      {Object.keys(tree)
        .sort()
        .map((key) => {
          const treeProps = tree[key];
          return (
            <li
              key={treeProps.id}
              className={cx({
                "ladle-linkable": treeProps.isLinkable,
                "ladle-active": treeProps.id === activeStory,
              })}
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
                  <NavigationSection
                    tree={treeProps.children}
                    activeStory={activeStory}
                  />
                </ul>
              )}
            </li>
          );
        })}
    </React.Fragment>
  );
};

export default Navigation;
