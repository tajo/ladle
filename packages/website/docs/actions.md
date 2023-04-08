---
id: actions
title: Actions
---

import Image from '@theme/IdealImage';
import imgActions from '../static/img/actions.png';

When your stories have interactive elements you can track user actions through this addon. It's a simple alternative to the combination of `console.log` and devtools. It makes the output easier to notice and parse.

```tsx
import type { Story } from "@ladle/react";

export const MyStory: Story<{
  onClick: () => void;
}> = ({ onClick }) => {
  return <button onClick={onClick}>Click me</button>;
};

MyStory.argTypes = {
  onClick: {
    action: "clicked",
  },
};
```

The click on this button creates a notification so you can inspect the event that was emitted:

<Image img={imgActions} alt="Actions" />

# Direct usage

You can also use this feature directly without argTypes:

```tsx
import { action } from "@ladle/react";

export const MyStory = () => (
  <button onClick={action("onClick")}>Manual</button>
);
```

The only argument of `action` is the label describing the event.
