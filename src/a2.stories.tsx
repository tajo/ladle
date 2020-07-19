import * as React from "react";

export const Middle: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Middle</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
