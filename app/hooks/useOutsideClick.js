import { useEffect, useRef } from "react";

function useOutsideClick(ref, handler, listenCapturing = true) {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handler, listenCapturing, ref]);

  return ref;
}

export default useOutsideClick;
