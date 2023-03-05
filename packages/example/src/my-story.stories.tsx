import { useState } from "react";
import type { Story } from "@ladle/react";

export const Big: Story = () => {
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

export const Ski: Story = () => {
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
