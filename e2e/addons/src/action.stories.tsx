import type { Story } from "@ladle/react";
import { action } from "@ladle/react";

export const Basic: Story<{
  onClick: () => void;
}> = ({ onClick }) => {
  return (
    <>
      <button id="args-button" onClick={onClick}>
        Args
      </button>
      <button id="manual-button" onClick={action("second")}>
        Manual
      </button>
    </>
  );
};

Basic.argTypes = {
  onClick: {
    action: "clicked",
  },
};
