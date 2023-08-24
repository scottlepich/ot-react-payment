import { useEffect } from "react";

export const useHasWindowGlobal = () => typeof window !== "undefined";

const useAssertWindowGlobal = () => {
  const hasWindowGlobal = useHasWindowGlobal();

  useEffect(() => {
    if (!hasWindowGlobal) {
      throw new Error("Must be run in a browser with `window` object.");
    }
  }, [hasWindowGlobal]);
};

export default useAssertWindowGlobal;
