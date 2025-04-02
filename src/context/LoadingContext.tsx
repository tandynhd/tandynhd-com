"use client";

import { createContext, useContext, useState, useEffect } from "react";

type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: true,
  setIsLoading: () => {},
});

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [windowLoaded, setWindowLoaded] = useState(false);

  useEffect(() => {
    const handleWindowLoad = () => {
      setWindowLoaded(true);
    };

    const handleImageLoad = () => {
      setImagesLoaded(true);
    };

    if (document.readyState === "complete") {
      setWindowLoaded(true);
    } else {
      window.addEventListener("load", handleWindowLoad);
    }

    const images = document.getElementsByTagName("img");
    let loadedImages = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
      setImagesLoaded(true);
    } else {
      Array.from(images).forEach((img) => {
        if (img.complete) {
          loadedImages++;
        } else {
          img.addEventListener("load", () => {
            loadedImages++;
            if (loadedImages === totalImages) {
              handleImageLoad();
            }
          });
        }
      });
    }

    return () => {
      window.removeEventListener("load", handleWindowLoad);
      Array.from(images).forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, []);

  useEffect(() => {
    if (windowLoaded && imagesLoaded) {
      setIsLoading(false);
    }
  }, [windowLoaded, imagesLoaded]);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoadingContext = () => useContext(LoadingContext);
