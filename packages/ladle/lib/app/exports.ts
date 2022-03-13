import { useLadleState } from "./src/context";
import { ActionType, GlobalState } from "../shared/types";

export { useLadleState };

export const useLink = () => {
  const [, dispatch] = useLadleState();
  return (value: string) => dispatch({ type: ActionType.UpdateStory, value });
};

export type GlobalProvider = React.FC<{ globalState: GlobalState }>;

export interface Story<P = {}> extends React.FC<P> {
  storyName?: string;
  parameters?: any;
  meta?: any;
  args?: Args;
  argTypes?: ArgTypes;
}

export interface Args {
  [key: string]: any;
}

export interface ArgType {
  name?: string;
  description?: string;
  defaultValue?: any;
  [key: string]: any;
}

export interface ArgTypes {
  [key: string]: ArgType;
}
