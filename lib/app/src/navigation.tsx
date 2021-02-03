import React from "react";
import cx from "classnames";
import { getHref } from "./history";
import { getStoryTree } from "./story-name";
import { Page, Down } from "./icons";
import type { StoryTree, UpdateStory } from "../../shared/types";

const Link: React.FC<{
  href: string;
  children: React.ReactNode;
  updateStory: UpdateStory;
  story: string;
}> = ({ href, children, updateStory, story }) => (
  <a
    href={href}
    onClick={(e) => {
      e.preventDefault();
      updateStory(story);
    }}
  >
    {children}
  </a>
);

const Navigation: React.FC<{
  stories: string[];
  story: string;
  updateStory: UpdateStory;
}> = ({ stories, story, updateStory }) => {
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
        placeholder="Search"
        aria-label="Search stories"
        value={search}
        ref={searchEl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <ul style={{ marginInlineStart: "-6px" }}>
        <NavigationSection
          tree={getStoryTree(filteredStories)}
          story={story}
          updateStory={updateStory}
        />
      </ul>
    </aside>
  );
};

const NavigationSection: React.FC<{
  tree: StoryTree;
  story: string;
  updateStory: UpdateStory;
}> = ({ tree, story, updateStory }) => {
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
                <div style={{ display: "flex" }}>
                  <Down />
                  <div>{treeProps.name}</div>
                </div>
              )}
              {Object.keys(treeProps.children).length > 0 && (
                <ul>
                  <NavigationSection
                    tree={treeProps.children}
                    story={story}
                    updateStory={updateStory}
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
