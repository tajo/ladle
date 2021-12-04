import { useState } from "react";

export default {
  title: "Big Blah / Ruck",
  meta: {
    baseweb: "test",
    browsers: ["chrome"],
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
};

export const Middle = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Newish haha</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
Middle.storyName = "Middle Man";

export const Opo2 = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha tada</h1>
      <input />
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Dayum = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha tada</h1>
      <input />
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
