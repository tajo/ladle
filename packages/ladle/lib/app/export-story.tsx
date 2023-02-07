import type * as React from "react";

const Story = ({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) => {
  return (
    <>
      <h1>{name}</h1>
      {children}
    </>
  );
};

export default Story;
