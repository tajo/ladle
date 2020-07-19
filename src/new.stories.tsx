import * as React from "react";

export const Rename: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Olalaasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
