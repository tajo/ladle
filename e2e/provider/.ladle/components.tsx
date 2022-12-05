import type { GlobalProvider } from "@ladle/react";
import { createContext } from "react";

export const MyContext = createContext("my-context");

export const Provider: GlobalProvider = ({ children, storyMeta }) => (
  <MyContext.Provider value="some-context">
    {storyMeta?.myMeta && <p id="myMeta">{storyMeta.myMeta}</p>}
    {children}
    <p>rendered by provider</p>
  </MyContext.Provider>
);
