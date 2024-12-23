// detecting parent's document.head changes, so we can apply the same CSS for
// the iframe, for CSS in JS using CSSStyleSheet API we transform it into
// style tags and append them to the iframe's document.head
// also re-fire hotkeys events from iframe to parent

import * as React from "react";
import { useFrame } from "./iframe";
import { redirectKeyup, redirectKeydown } from "./redirect-events";
const CSS_ATTR = "data-debug-css";

function addStyleElement(rule: string, doc: Document, index?: number): number {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  const tag = doc.createElement("style");
  tag.setAttribute(CSS_ATTR, "true");
  tag.appendChild(doc.createTextNode(rule));
  if (index && existingTags[index]) {
    existingTags[index].after(tag);
    return index + 1;
  } else {
    doc.head.appendChild(tag);
    return existingTags.length;
  }
}

function deleteStyleElement(doc: Document, index?: number) {
  const existingTags = doc.head.querySelectorAll(`style[${CSS_ATTR}]`);
  if (index != undefined && existingTags[index]) {
    existingTags[index].remove();
  }
}

const SynchronizeHead = ({
  active,
  children,
  rtl,
  width,
}: {
  active: boolean;
  children: React.ReactNode;
  rtl: boolean;
  width: number;
}) => {
  const { window: storyWindow, document: iframeDocument } = useFrame();
  const syncHead = () => {
    if (!storyWindow) return;
    storyWindow.document.documentElement.setAttribute(
      "dir",
      rtl ? "rtl" : "ltr",
    );
    [...(document.head.children as any)].forEach((child) => {
      if (
        child.tagName === "STYLE" ||
        (child.tagName === "LINK" &&
          (child.getAttribute("type") === "text/css" ||
            child.getAttribute("rel") === "stylesheet"))
      ) {
        const exists = [...(storyWindow.document.head.children as any)].some(
          (el) => {
            if (el.tagName === "LINK") {
              return el.getAttribute("href") === child.getAttribute("href");
            }
            if (el.tagName === "STYLE") {
              return el.innerHTML === child.innerHTML;
            }
            return false;
          },
        );
        if (exists) return;
        storyWindow.document.head.appendChild(
          child.cloneNode(true),
        ) as HTMLStyleElement;
      }
    });
  };

  React.useEffect(() => {
    const originalInsertRule = window.CSSStyleSheet.prototype.insertRule;
    const originalDeleteRule = window.CSSStyleSheet.prototype.deleteRule;

    window.CSSStyleSheet.prototype.insertRule = function (rule, index) {
      const retVal = addStyleElement(rule, document, index);
      if (active && iframeDocument) {
        return addStyleElement(rule, iframeDocument, index);
      }
      return retVal;
    };

    window.CSSStyleSheet.prototype.deleteRule = function (index) {
      deleteStyleElement(document, index);
      if (active && iframeDocument) {
        deleteStyleElement(iframeDocument, index);
      }
    };

    return () => {
      window.CSSStyleSheet.prototype.insertRule = originalInsertRule;
      window.CSSStyleSheet.prototype.deleteRule = originalDeleteRule;
    };
  }, []);

  React.useEffect(() => {
    if (active) {
      syncHead();
      iframeDocument?.addEventListener("keydown", redirectKeydown);
      iframeDocument?.addEventListener("keyup", redirectKeyup);
      const observer = new MutationObserver(() => syncHead());
      document.documentElement.setAttribute("data-iframed", `${width}`);
      observer.observe(document.head, {
        subtree: true,
        characterData: true,
        childList: true,
      });
      return () => {
        observer && observer.disconnect();
        iframeDocument?.removeEventListener("keydown", redirectKeydown);
        iframeDocument?.removeEventListener("keyup", redirectKeyup);
      };
    }
    return;
  }, [active, rtl, iframeDocument]);
  return children;
};

export default SynchronizeHead;
