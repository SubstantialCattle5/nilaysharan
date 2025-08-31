'use client';
import clsx from 'clsx';
import * as React from 'react';

const PreloadContext = React.createContext<boolean>(false);

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  /** If the dom is loaded */
  const [preloaded, setIsPreloaded] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // 200 ms delay to prevent flash
  React.useEffect(() => {
    if (!isMounted) return;
    
    const timer = setTimeout(() => {
      setIsPreloaded(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <PreloadContext.Provider value={preloaded}>
      {isMounted && (
        <div
          className={clsx(
            'dark:bg-dark fixed inset-0 flex items-center justify-center bg-white transition-opacity',
            preloaded && 'pointer-events-none opacity-0'
          )}
        />
      )}
      {children}
    </PreloadContext.Provider>
  );
}

export const usePreloadState = () => React.useContext(PreloadContext);
