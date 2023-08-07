import { GlobalAction, ActionType, GlobalState } from "../../shared/types";
import debug from "./debug";

const reducer = (state: GlobalState, action: GlobalAction): GlobalState => {
  debug("Action dispatched", action);
  switch (action.type) {
    case ActionType.UpdateAll:
      return { ...state, ...action.value };
    case ActionType.UpdateMode:
      return { ...state, mode: action.value };
    case ActionType.UpdateAction:
      const result = { ...state };
      if (action.clear) {
        result.action = [];
      }
      if (!action.value) return result;
      return { ...state, action: [...result.action, action.value] };
    case ActionType.UpdateRtl:
      return { ...state, rtl: action.value };
    case ActionType.UpdateSource:
      return { ...state, source: action.value };
    case ActionType.UpdateStory:
      return {
        ...state,
        story: action.value,
        control: {},
        controlInitialized: false,
        width: 0,
        action: [],
      };
    case ActionType.UpdateTheme:
      return { ...state, theme: action.value };
    case ActionType.UpdateWidth:
      return { ...state, width: action.value };
    case ActionType.UpdateControl:
      return { ...state, control: action.value, controlInitialized: true };
    case ActionType.UpdateControlIntialized:
      return { ...state, controlInitialized: action.value };
    case ActionType.UpdateHotkeys:
      return { ...state, hotkeys: action.value };
    default:
      return state;
  }
};

export default reducer;
