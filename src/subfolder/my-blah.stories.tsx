import * as React from "react";

export default {
  title: "This is my title",
};

export const NotCool: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Middle eeee lol strange omg asd haha</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Op2o: React.FC = () => {
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
