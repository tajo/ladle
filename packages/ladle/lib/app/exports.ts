import { useLadleState } from "./src/context";
import { ActionType } from "../shared/types";

export { useLadleState };

export const useLink = () => {
  const [, dispatch] = useLadleState();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
};
