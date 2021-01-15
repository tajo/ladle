import * as React from "react";

export default {
  title: "Big Blah / Ruck",
  parameters: {
    baseweb: "test",
    browsers: ["chrome"],
  },
};

export const Middle = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Middle eeee lol strange omg asd haha asdasd asd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
Middle.storyName = "Middle Man";

export const Opo = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Opo4: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>opo Middle Muhaha 4 asd asd asd asd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Next: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Next opo Middle Muhaha 4 asd asd asd asd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
