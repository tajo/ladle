import queryString from "query-string";
import { Preview } from "../icons";
import { ModeState } from "../../../shared/types";
import history from "../history";

export const getQuery = (locationSearch: string) => {
  const mode = queryString.parse(locationSearch).mode as string;
  switch (mode) {
    case ModeState.Full:
      return ModeState.Full;
    case ModeState.Preview:
      return ModeState.Preview;
    default:
      return ModeState.Full;
  }
};

export const Button: React.FC<{}> = () => {
  return (
    <li>
      <button
        aria-label="Open preview mode. It removes all other styles and wrappers."
        title="Open preview mode. It removes all other styles and wrappers."
        onClick={() => {
          const params = queryString.parse(location.search);
          params["mode"] = ModeState.Preview;
          history.push(`?${queryString.stringify(params)}`);
        }}
      >
        <Preview />
        <label>Open preview mode</label>
      </button>
    </li>
  );
};
