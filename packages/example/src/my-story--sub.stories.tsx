import type { Story } from "@ladle/react";
import { useState } from "react";

export const Middle: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Middle fam</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};

export const Yellow: Story = () => {
  const [val, setVal] = useState(true);
  return (
    <div>
      <h1>Yellowasd</h1>
      <button onClick={() => setVal(false)}>
        button {val ? "true" : "false"}
      </button>
    </div>
  );
};
