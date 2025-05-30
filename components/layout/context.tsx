import React, { createContext, useContext, useState } from 'react';

interface LayoutContextType {
  withBackground: boolean;
  setWithBackground: (withBackground: boolean) => void;
  withBottomTabs: boolean;
  setWithBottomTabs: (withBottomTabs: boolean) => void;
  withFooter: boolean;
  setWithFooter: (withFooter: boolean) => void;
}

const initialState: LayoutContextType = {
  withBackground: false,
  setWithBackground: () => {},
  withBottomTabs: false,
  setWithBottomTabs: () => {},
  withFooter: false,
  setWithFooter: () => {},
};

export const LayoutContext = createContext<LayoutContextType>(initialState);

export function useLayoutContext() {
  return useContext(LayoutContext);
}

// Layout Provider Component
interface LayoutProviderProps {
  children: React.ReactNode;
}

export const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [withBackground, setWithBackground] = useState(false);
  const [withBottomTabs, setWithBottomTabs] = useState(false);
  const [withFooter, setWithFooter] = useState(false);

  return (
    <LayoutContext.Provider
      value={{
        withBackground,
        setWithBackground,
        withBottomTabs,
        setWithBottomTabs,
        withFooter,
        setWithFooter,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}; 