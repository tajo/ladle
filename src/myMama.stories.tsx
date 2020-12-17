import * as React from "react";

export const BigBarkingDog: React.FC = () => {
  return <h1> Big Barking Dog</h1>;
};

export const Zebra: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>BahaaaAAAasdasdasdasdasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Hahaasdasd: React.FC = () => {
  const [val, setVal] = React.useState("");
  return (
    <div>
      <h1>This is a new asd asdas soo asd asd</h1>
      And it stays here so I can ajust keep typing :)
      <input onChange={(e) => setVal(e.target.value)} value={val} />
    </div>
  );
};

export const Funny: React.FC = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>Funnyyyy asdasdasdads</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
