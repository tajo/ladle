import * as React from "react";

// We to instantiate React context in a separate package
// because otherwise Vite in dev mode would server context.ts in two different files
// due to atypical setup we have with Ladle
const LadleContext = React.createContext(undefined);
export default LadleContext;
