import { useEffect, useState } from "react";

const debounce = (func, delay) => {
  let timeoutID;
  return (...args) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(func, delay, [...args]);
  };
};

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  useEffect(() => {
    handleResize();
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 200);

    window.addEventListener("resize", debouncedHandleResize);
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return windowSize;
}

export default useWindowSize;
