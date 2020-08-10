import * as React from "react";

export const Pink: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Pink</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Green: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Green</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
