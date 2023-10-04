---
id: query-parameters
title: Query Parameters
---

If you want to use URL query parameters to render your story, you will be able to achieve it like this:

```tsx
import type { Story } from "@ladle/react";
import { useEffect, useState } from "react";

export const QueryParameters: Story = () => {
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(location.search);
  }, [location.search]);

  return <p>Params: {queryParams}</p>;
};

QueryParameters.decorators = [
  (Component) => {
    useEffect(() => {
      const url = new URL(window.location.href);
      url.searchParams.set("foo", "bar");
      history.pushState({}, "", url);
    }, []);

    return (
      <>
        <Component />
      </>
    );
  },
];
```
