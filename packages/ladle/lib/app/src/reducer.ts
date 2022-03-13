import { GlobalAction, ActionType, GlobalState } from "../../shared/types";
import debug from "./debug";

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  debug("Action dispatched", action);
  switch (action.type) {
    case ActionType.UpdateAll:
      return { ...state, ...action.value };
    case ActionType.UpdateMode:
      return { ...state, mode: action.value };
    case ActionType.UpdateRtl:
      return { ...state, rtl: action.value };
    case ActionType.UpdateStory:
      return { ...state, story: action.value, control: {} };
    case ActionType.UpdateTheme:
      return { ...state, theme: action.value };
    case ActionType.UpdateControl:
      return { ...state, control: action.value };
    default:
      return state;
  }
};

export default reducer;
