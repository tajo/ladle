import { useState } from "react";

export const World = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
