import * as React from "react";
import queryString from "query-string";
import Highlight, { defaultProps } from "prism-react-renderer";
import themeLight from "prism-react-renderer/themes/github";
import themeDark from "prism-react-renderer/themes/nightOwl";
import { storySource, stories } from "../../generated/generated-list";
import { AddonProps, GlobalState, ActionType } from "../../../shared/types";
import { Source } from "../icons";
import { Modal, Code } from "../ui";
import config from "../get-config";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).source;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.source.defaultState;
};

const CodeFrame: React.FC<{ globalState: GlobalState }> = ({ globalState }) => {
  const theme = globalState.theme === "dark" ? themeDark : themeLight;
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
      <div style={{ paddingTop: "2em" }}>
        <Code>{entry}</Code> source code
      </div>
      <Highlight
        {...defaultProps}
        code={storySource[globalState.story]}
        language="tsx"
        theme={{
          ...theme,
          plain: {
            ...theme.plain,
            backgroundColor: "var(--ladle-bg-color-secondary)",
          },
        }}
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
    </>
  );
};

export const Button: React.FC<AddonProps> = ({ globalState, dispatch }) => {
  const text = "Show the story source code.";

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
