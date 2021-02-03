import queryString from "query-string";
import { Rtl } from "../icons";
import { AddonProps, ActionType } from "../../../shared/types";
import config from "../get-config";

export const getQuery = (locationSearch: string) => {
  const urlVal = queryString.parse(locationSearch).rtl;
  if (urlVal === "true") return true;
  if (urlVal === "false") return false;
  return config.addons.rtl.defaultState;
};

export const Button: React.FC<AddonProps> = ({ dispatch, globalState }) => {
  return (
    <li>
      <button
        aria-label="Switch text direction to right to left."
        title="Switch text direction to right to left."
        className={globalState.rtl ? "ladle-active" : ""}
        onClick={() =>
          dispatch({ type: ActionType.UpdateRtl, value: !globalState.rtl })
        }
      >
        <Rtl />
        <label>Right to left</label>
      </button>
    </li>
  );
};
