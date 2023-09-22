import * as React from "react";

const Msw = ({ children, msw }) => {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const initMsw = async () => {
      if (msw) {
        const { setupWorker } = await import("msw");
        const worker = setupWorker(msw);
        void worker.start().then(() => {
          setReady(true);
        });
        return () => {
          worker.stop();
        };
      }
      return;
    };
    initMsw();
  }, [msw]);

  if (!msw) {
    return children;
  }

  if (!ready) {
    return <h1>Loading</h1>;
  }

  return (
    <div>
      <h1>MSW enabled</h1>
      {children}
    </div>
  );
};

export default Msw;
