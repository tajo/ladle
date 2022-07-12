import * as React from "react";
import queryString from "query-string";
import { AddonProps, ActionType } from "../../../shared/types";
import { stories } from "virtual:generated-list";
import { Modal } from "../ui";
import { Width } from "../icons";
import config from "../get-config";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).width;
  let res = 0;
  Object.keys(config.addons.width.options).forEach((key) => {
    if (
      key === urlVal ||
      parseInt(urlVal as string, 10) === config.addons.width.options[key]
    ) {
      res = config.addons.width.options[key];
    }
  });
  return res !== 0 ? res : config.addons.width.defaultState;
};

export const Button: React.FC<AddonProps> = ({ globalState, dispatch }) => {
  const text = "Change the story viewport.";
  const [open, setOpen] = React.useState(false);
  const storyData = stories[globalState.story];
  let metaWidth = storyData && storyData.meta ? storyData.meta.meta.width : 0;
  let options = config.addons.width.options;
  Object.keys(options).forEach((key) => {
    if (key === metaWidth) {
      metaWidth = options[key];
    }
  });

  if (metaWidth && !Object.values(options).includes(metaWidth)) {
    options = {
      custom: metaWidth,
      ...options,
    };
  }
  return (
    <li>
      <button
        aria-label={text}
        data-testid="addon-width"
        title={text}
        onClick={() => setOpen(true)}
        className={open ? "width-active" : ""}
      >
        <Width />
        <span className="ladle-addon-tooltip">{text}</span>
        <label>Set story width</label>
        <Modal
          isOpen={open}
          close={() => setOpen(false)}
          label="Dialog with the story width selector."
        >
          <p>Select story width</p>
          <div>
            <input
              onChange={() =>
                dispatch({ type: ActionType.UpdateWidth, value: 0 })
              }
              type="radio"
              id={`width-unset`}
              name="width"
              value={0}
              checked={globalState.width === 0}
            />
            <label htmlFor={`width-unset`} style={{ paddingLeft: "8px" }}>
              unset
            </label>
          </div>
          {Object.keys(options).map((key) => {
            return (
              <div key={key}>
                <input
                  onChange={() =>
                    dispatch({
                      type: ActionType.UpdateWidth,
                      value: options[key],
                    })
                  }
                  type="radio"
                  id={`width-${key}`}
                  name="width"
                  value={options[key]}
                  checked={globalState.width === options[key]}
                />
                <label htmlFor={`width-${key}`} style={{ paddingLeft: "8px" }}>
                  {options[key]}px - {key}
                </label>
              </div>
            );
          })}
          <p></p>
        </Modal>
      </button>
    </li>
  );
};
