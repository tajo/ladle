import queryString from "query-string";
import { Rtl } from "../icons";
import { AddonProps, ActionType } from "../../../shared/types";

export const getQuery = (locationSearch: string) => {
  return queryString.parse(locationSearch).rtl === "true" ? true : false;
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
