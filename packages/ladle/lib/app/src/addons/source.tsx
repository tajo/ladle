import type { Language } from "prism-react-renderer";
import { Highlight } from "prism-react-renderer";
import queryString from "query-string";
import * as React from "react";
import { useHotkeys } from "react-hotkeys-hook";
import {
  stories,
  storySource,
  StorySourceHeader,
} from "virtual:generated-list";
import { ActionType, AddonProps, GlobalState } from "../../../shared/types";
import config from "../get-config";
import { Source } from "../icons";
import { Modal } from "../ui";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).source;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.source.defaultState;
};

export const CodeHighlight = ({
  children,
  theme,
  language = "tsx",
  locStart,
  locEnd,
  className,
}: {
  children: string;
  theme: string;
  language?: Language;
  locStart?: number;
  locEnd?: number;
  className?: string;
}) => {
  const withLoc =
    typeof locStart !== "undefined" && typeof locEnd !== "undefined";
  const match = /language-(\w+)/.exec(className || "");

  if (match) {
    language = match[1] as Language;

    return (
      <Highlight
        code={children.trim()}
        language={language}
        theme={
          theme === "dark"
            ? config.addons.source.themeDark
            : config.addons.source.themeLight
        }
      >
        {({ className, style, tokens, getTokenProps }) => (
          <div
            className={className}
            style={{
              ...style,
              textAlign: "left",
              margin: "0.5em 0 1em 0",
              padding: "1em",
            }}
          >
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </div>
        )}
      </Highlight>
    );
  }

  if (withLoc) {
    return (
      <Highlight
        code={children.trim()}
        language={language}
        theme={
          theme === "dark"
            ? config.addons.source.themeDark
            : config.addons.source.themeLight
        }
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              textAlign: "left",
              margin: "0.5em 0 1em 0",
              padding: "1em 0",
              overflow: "auto",
              maxHeight: "50vh",
            }}
          >
            {tokens.map((line, i) => (
              <div
                key={i}
                id={`ladle_loc_${i + 1}`}
                {...getLineProps({ line, key: i })}
                style={{ display: "table-row" }}
              >
                <span
                  className="ladle-addon-source-lineno"
                  style={
                    i + 1 >= locStart && i + 1 <= locEnd
                      ? {
                          backgroundColor: "var(--ladle-color-accent)",
                          color: "#FFF",
                        }
                      : undefined
                  }
                >
                  {i + 1}
                </span>
                <div
                  style={{
                    display: "table-cell",
                    paddingLeft: "0.5em",
                  }}
                >
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    );
  }
  return <code>{children}</code>;
};

const CodeFrame = ({ globalState }: { globalState: GlobalState }) => {
  if (!stories[globalState.story]) {
    return <>There is no story loaded.</>;
  }
  const { entry, locStart, locEnd } = stories[globalState.story];
  React.useEffect(() => {
    window.location.hash = ``;
    window.location.hash = `ladle_loc_${locStart}`;
  }, [locStart]);
  return (
    <>
      <StorySourceHeader path={entry} locStart={locStart} locEnd={locEnd} />
      <CodeHighlight
        theme={globalState.theme}
        language="tsx"
        locEnd={locEnd}
        locStart={locStart}
      >
        {decodeURIComponent(storySource[globalState.story])}
      </CodeHighlight>
    </>
  );
};

export const Button = ({ globalState, dispatch }: AddonProps) => {
  const text = "Show the story source code.";
  useHotkeys(
    config.hotkeys.source,
    () => {
      dispatch({
        type: ActionType.UpdateSource,
        value: !globalState.source,
      });
    },
    {
      enabled: globalState.hotkeys && config.addons.source.enabled,
    },
  );

  return (
    <li>
      <button
        aria-label={text}
        data-testid="addon-source"
        title={text}
        onClick={() => {
          dispatch({
            type: ActionType.UpdateSource,
            value: !globalState.source,
          });
        }}
        className={globalState.source ? "source-active" : ""}
        type="button"
      >
        <Source />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Story Source Code</label>
        <Modal
          isOpen={globalState.source}
          close={() =>
            dispatch({
              type: ActionType.UpdateSource,
              value: false,
            })
          }
          label="Dialog with the story source code."
        >
          <CodeFrame globalState={globalState} />
        </Modal>
      </button>
    </li>
  );
};
