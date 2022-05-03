import { useLink } from "@ladle/react";

export const World = () => {
  const link = useLink();
  return (
    <>
      <h1>Hello World</h1>
      <button id="btn" onClick={() => link("hello--linked")}>
        Go to Linked Story
      </button>
    </>
  );
};

export const Linked = () => {
  return <h2>Linked Story</h2>;
};
