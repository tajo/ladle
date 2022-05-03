export default {
  decorators: [
    (Stories: React.FC) => (
      <>
        Decorator 1<Stories />
      </>
    ),
    (Stories: React.FC) => (
      <>
        Decorator 2<Stories />
      </>
    ),
  ],
};

export const World = () => {
  return <h2>world</h2>;
};

World.decorators = [
  (Stories: React.FC) => (
    <>
      Decorator 3<Stories />
    </>
  ),
];
