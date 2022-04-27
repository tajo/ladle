import * as React from "react";
import { Config, GlobalState, GlobalAction } from "../../shared/types";
import { Button as ThemeButton } from "./addons/theme";
import { Button as ControlButton } from "./addons/control";
import { Button as ModeButton } from "./addons/mode";
import { Button as RtlButton } from "./addons/rtl";
import { Button as SourceButton } from "./addons/source";
import { Button as LadleButton } from "./addons/ladle";
import config from "./get-config";

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
    <aside className="ladle-addons">
      <ul>
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
        {config.addons.source.enabled && (
          <SourceButton globalState={globalState} dispatch={dispatch} />
        )}
        {config.addons.ladle.enabled && <LadleButton />}
      </ul>
    </aside>
  );
};

export default AddonPanel;
