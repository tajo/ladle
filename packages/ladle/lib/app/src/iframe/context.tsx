import React, { useContext, Context } from "react";

let doc: Document | undefined;
let win: Window | undefined;

if (typeof document !== "undefined") {
  doc = document;
}
if (typeof window !== "undefined") {
  win = window;
}

interface FrameContextType {
  document: Document | undefined;
  window: Window | undefined;
}

export const FrameContext: Context<FrameContextType> =
  React.createContext<FrameContextType>({
    document: doc,
    window: win,
  });

export const useFrame = (): FrameContextType => useContext(FrameContext);

export const {
  Provider: FrameContextProvider,
  Consumer: FrameContextConsumer,
} = FrameContext;
