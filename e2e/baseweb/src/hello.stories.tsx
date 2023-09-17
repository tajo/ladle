import type { Story } from "@ladle/react";
import { Button } from "baseui/button";
import { StarRating } from "baseui/rating";
import { useState } from "react";

export const World: Story = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(3);
  return (
    <>
      <h1>Hello world!</h1>
      <Button onClick={() => setOpen(!open)}>Click me!</Button>
      {open && (
        <div>
          <StarRating
            numItems={5}
            onChange={(data) => setValue(data.value)}
            size={22}
            value={value}
          />
        </div>
      )}
      <p>
        <button
          data-testid="add"
          onClick={() => {
            const sheet = new CSSStyleSheet();
            sheet.insertRule(`h1 { background-color: pink; }`);
          }}
        >
          add
        </button>
      </p>
      <p>
        <button
          data-testid="remove"
          onClick={() => {
            const sheet = new CSSStyleSheet();
            sheet.deleteRule(
              document.head.querySelectorAll("style[data-debug-css]").length -
                1,
            );
          }}
        >
          remove
        </button>
      </p>
    </>
  );
};
