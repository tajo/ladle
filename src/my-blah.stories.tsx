import { useState } from "react";

export default {
  title: "Big Blah / Ruck",
  parameters: {
    baseweb: "test",
    browsers: ["chrome"],
  },
};

export const Middle = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>New</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
Middle.storyName = "Middle Man";

export const Opo = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha</h1>
      <input />
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
