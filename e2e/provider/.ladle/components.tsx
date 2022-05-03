import { createContext } from "react";

export const MyContext = createContext("my-context");

export const Provider = ({ children }) => (
  <MyContext.Provider value="some-context">
    {children}
    <p>rendered by provider</p>
  </MyContext.Provider>
);
