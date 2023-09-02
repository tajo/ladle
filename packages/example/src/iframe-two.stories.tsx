import { useEffect, useRef } from "react";

export default {
  meta: {
    iframed: true,
  },
};

export const AutoFocusInputAgain = () => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      // @ts-ignore
      inputRef.current.focus();
    }
  }, []);

  return <input ref={inputRef} />;
};
