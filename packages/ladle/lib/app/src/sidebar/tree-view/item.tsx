import cx from "classnames";
import React, { memo, useCallback, useMemo } from "react";
import { StoryTreeItem } from "../../../../shared/types";
import { getHref } from "../../history";
import { ChevronRight, Circle, Folder, Package } from "../../icons";

export type OnTreeItemKeyDown = (
  event: React.KeyboardEvent<HTMLElement>,
  treeItem: StoryTreeItem,
) => void;

export type OnTreeItemExpand = (treeItem: StoryTreeItem) => void;

export type OnTreeItemSelect = (treeItem: StoryTreeItem) => void;

export type OnTreeItemRef = (
  element: HTMLElement | null,
  treeItem: StoryTreeItem,
) => void;

export const TreeViewItem = memo(
  ({
    treeItem,
    isActive,
    depth,
    onKeyDown,
    onSelect,
    onExpand,
    onRef,
    children,
  }: {
    treeItem: StoryTreeItem;
    isActive: boolean;
    depth?: number;
    onKeyDown: OnTreeItemKeyDown;
    onSelect: OnTreeItemSelect;
    onExpand: OnTreeItemExpand;
    onRef: OnTreeItemRef;
    children: React.ReactNode;
  }) => {
    const { id, name, isExpanded, isLinkable } = treeItem;
    const buttonStyle = {
      paddingLeft: `${depth}rem`,
      paddingRight: `${depth}rem`,
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) =>
      onKeyDown(e, treeItem);
    const handleLinkClick = useCallback(
      (e: React.MouseEvent) => {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          onSelect(treeItem);
        }
      },
      [onSelect, treeItem],
    );
    const handleButtonClick = () => onExpand(treeItem);
    const href = getHref({ story: id });
    const handleRef = (element: HTMLElement | null) => onRef(element, treeItem);
    const ButtonIcon = useMemo(() => {
      if (treeItem.children.some((child) => child.isLinkable)) {
        return Package;
      }

      return Folder;
    }, [treeItem.children]);

    return (
      <li
        onKeyDown={handleKeyDown}
        aria-expanded={isExpanded}
        tabIndex={isActive && !isLinkable ? 0 : -1}
        ref={isLinkable ? undefined : handleRef}
        role={isLinkable ? "none" : "treeitem"}
        key={id}
        className={cx("ladle-tree-view-item", {
          "ladle-linkable": isLinkable,
          "ladle-active": isActive,
        })}
        data-active={isActive || undefined}
      >
        {isLinkable ? (
          <a
            tabIndex={isActive ? 0 : -1}
            ref={handleRef}
            role="treeitem"
            href={href}
            onKeyDown={handleKeyDown}
            onClick={handleLinkClick}
            className="ladle-tree-view-button"
            style={buttonStyle}
          >
            <Circle className="ladle-tree-view-story-icon" />
            <span>{name}</span>
          </a>
        ) : (
          <button
            className="ladle-tree-view-button"
            style={buttonStyle}
            onClick={handleButtonClick}
          >
            <ChevronRight
              className="ladle-tree-view-chevron"
              data-expanded={isExpanded ? "true" : undefined}
            />
            <ButtonIcon className="ladle-tree-view-folder" />
            <p>{name}</p>
          </button>
        )}
        {children}
      </li>
    );
  },
);
TreeViewItem.displayName = "TreeViewItem";
