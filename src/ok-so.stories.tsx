import * as React from "react";

export const Yeah = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Tada tohle je cool</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
