import type { Story } from "@ladle/react";
import { useEffect, useState } from "react";

export const QueryParams: Story = () => {
  const [queryParams, setQueryParams] = useState<string>("");

  useEffect(() => {
    setQueryParams(location.search);
  }, [location.search]);

  return <p>Params: {queryParams}</p>;
};

QueryParams.decorators = [
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
