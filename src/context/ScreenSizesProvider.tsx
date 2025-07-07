import React, { createContext, useContext, useEffect, useState } from 'react';

const ScreenWidthContext = createContext<number>(window.innerWidth);
const ScreenHeightContext = createContext<number>(window.innerHeight);
const ScrollTopContext = createContext<number>(window.scrollY);

export const useScreenWidth = () => useContext(ScreenWidthContext);
export const useScreenHeight = () => useContext(ScreenHeightContext);
export const useScrollTop = () => useContext(ScrollTopContext);

export const ScreenSizesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [scrollTop, setScrollTop] = useState(window.scrollY);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };
    const handleScroll = () => {
      setScrollTop(window.scrollY);
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ScreenWidthContext.Provider value={screenWidth}>
      <ScreenHeightContext.Provider value={screenHeight}>
        <ScrollTopContext.Provider value={scrollTop}>
          {children}
        </ScrollTopContext.Provider>
      </ScreenHeightContext.Provider>
    </ScreenWidthContext.Provider>
  );
};