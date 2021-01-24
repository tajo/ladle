import * as React from "react";
import { Config, GlobalState } from "../../shared/types";
import { Button as ThemeButton } from "./addons/theme";
import { Button as ModeButton } from "./addons/mode";

type AddonNames = keyof Config["addons"];

const AddonPanel: React.FC<{ config: Config; globalState: GlobalState }> = ({
  config,
  globalState,
}) => {
  if (
    Object.keys(config.addons).every(
      (addonName) => config.addons[addonName as AddonNames].enabled === false
    )
  ) {
    return null;
  }
  return (
    <aside className="ladle-addons">
      <ul>
        {config.addons.theme.enabled && (
          <ThemeButton globalState={globalState} />
        )}
        {config.addons.mode.enabled && <ModeButton />}
      </ul>
    </aside>
  );
};

export default AddonPanel;
