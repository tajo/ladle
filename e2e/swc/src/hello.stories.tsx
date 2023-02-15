import { useState } from "react";
import Context from "./context";

export const World = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <Context />
      <h1>Hello World</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
