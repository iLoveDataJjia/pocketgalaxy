import { useState, useEffect } from "react";

export function useViewportSize() {
  const sizeInPixels = 768; // Width of 768 pixels
  const [isMd, setIsMd] = useState<boolean>(false);

  const handleResize = () => {
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;
    setIsMd(windowWidth >= sizeInPixels);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isMd };
}
