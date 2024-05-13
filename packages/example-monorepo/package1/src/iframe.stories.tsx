import { useEffect, useRef } from "react";

export default {
  meta: {
    iframed: true,
  },
};

export const Page = () => <div>Page</div>;
export const PageB = () => <div>Page B</div>;
export const PageC = () => <div>Page C</div>;
export const AutoFocusInput = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
};
