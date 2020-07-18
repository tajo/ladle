import React from "react";

export const Middle = () => {
  const [val, setVal] = React.useState(true);
  return (
    <div>
      <h1>
        This is vasdasdsderyasasdoingsd asd asdds how is love thios asd s asdok
        hahalovely so asd haj jse tasdd asdsad sd asdasd as myasd asd
        asdgoooodasd asdas dasd sI love this show :) Ok asd asd asd daasd
      </h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
