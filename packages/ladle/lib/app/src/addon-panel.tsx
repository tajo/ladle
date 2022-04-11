import * as React from "react";
import { Config, GlobalState, GlobalAction } from "../../shared/types";
import { Button as ThemeButton } from "./addons/theme";
import { Button as ControlButton } from "./addons/control";
import { Button as ModeButton } from "./addons/mode";
import { Button as RtlButton } from "./addons/rtl";
import { Button as LadleButton } from "./addons/ladle";
import config from "./get-config";
import { ChevronRight, Circle } from "./icons";

type AddonNames = keyof Config["addons"];

const AddonPanel: React.FC<{
  globalState: GlobalState;
  dispatch: React.Dispatch<GlobalAction>;
}> = ({ globalState, dispatch }) => {
  if (
    Object.keys(config.addons).every(
      (addonName) => config.addons[addonName as AddonNames].enabled === false,
    )
  ) {
    return null;
  }

  return (
    <aside data-ladle className="ladle-addons">
      <div className="ladle-addons-story-title">
        <Circle className="ladle-addons-story-icon" />
        {globalState.story}
        <ChevronRight className="ladle-addons-story-divider" />
      </div>
      <ul className="ladle-addons-controls">
        {config.addons.control.enabled &&
          Object.keys(globalState.control).length > 0 && (
            <ControlButton globalState={globalState} dispatch={dispatch} />
          )}
        {config.addons.theme.enabled && (
          <ThemeButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.mode.enabled && (
          <ModeButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.rtl.enabled && (
          <RtlButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.ladle.enabled && <LadleButton />}
      </ul>
    </aside>
  );
};

export default AddonPanel;
