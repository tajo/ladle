import React from "react";
import Deep from "./component";

export const Haha = () => {
  const [val, setVal] = React.useState("");
  return (
    <div>
      <h1>This is reallyasdasd asdasd asdquick</h1>
      <input onChange={(e) => setVal(e.target.value)} value={val} />
      <Deep />
    </div>
  );
};

export const Funny = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Funny ok</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
