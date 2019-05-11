import { useState, useEffect } from "react";
import { MOBILE_BREAKPOINT } from "../constants";

const getState = () => {
  if (typeof window === "undefined") {
    return {};
  }

  const { innerWidth } = window;
  const isMobile = innerWidth < MOBILE_BREAKPOINT;
  const isTablet = !isMobile && innerWidth < 1024;
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
};

const useMedia = () => {
  const initialState = getState();
  const [state, setState] = useState(initialState);

  const onResize = () => {
    setState(getState());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return state;
};

export default useMedia;
