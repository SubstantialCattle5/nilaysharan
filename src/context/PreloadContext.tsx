'use client';
import clsx from 'clsx';
import * as React from 'react';

const PreloadContext = React.createContext<boolean>(false);

export function PreloadProvider({ children }: { children: React.ReactNode }) {
  /** If the dom is loaded */
  const [preloaded, setIsPreloaded] = React.useState<boolean>(false);

  // 200 ms delay to prevent flash
  React.useEffect(() => {
    setTimeout(() => {
      setIsPreloaded(true);
    }, 200);
  }, []);

  return (
    <PreloadContext.Provider value={preloaded}>
      <div
        className={clsx(
          'dark:bg-dark fixed inset-0 flex items-center justify-center bg-white transition-opacity',
          preloaded && 'pointer-events-none opacity-0'
        )}
      />
      {children}
    </PreloadContext.Provider>
  );
}

export const usePreloadState = () => React.useContext(PreloadContext);
