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

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoadingContext = () => useContext(LoadingContext);
