import React from "react";

export const Middle = () => {
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
