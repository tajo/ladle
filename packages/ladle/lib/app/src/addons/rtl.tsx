import queryString from "query-string";
import { useHotkeys } from "react-hotkeys-hook";
import { Rtl } from "../icons";
import { AddonProps, ActionType } from "../../../shared/types";
import config from "../get-config";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).rtl;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.rtl.defaultState;
};

export const Button = ({ dispatch, globalState }: AddonProps) => {
  const rtlText = "Switch text direction to right to left.";
  const ltrText = "Switch text direction to left to right.";
  useHotkeys(
    config.hotkeys.rtl,
    () => dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl }),
    {
      enabled: globalState.hotkeys && config.addons.rtl.enabled,
    },
  );
  return (
    <li>
      <button
        aria-label={globalState.rtl ? ltrText : rtlText}
        title={globalState.rtl ? ltrText : rtlText}
        className={globalState.rtl ? "ladle-active" : ""}
        onClick={() =>
          dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl })
        }
        type="button"
      >
        <Rtl />
        <span className="ladle-addon-tooltip">
          {globalState.rtl ? ltrText : rtlText}
        </span>
        <label>Right to left</label>
      </button>
    </li>
  );
};
