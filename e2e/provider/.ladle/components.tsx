import { createContext } from "react";

export const MyContext = createContext("my-context");

export const Provider: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <MyContext.Provider value="some-context">
    {children}
    <p>rendered by provider</p>
  </MyContext.Provider>
);
