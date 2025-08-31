import * as React from 'react';

import { usePreloadState } from '@/context/PreloadContext';

export default function useLoaded() {
  const preloaded = usePreloadState();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;
    
    if (preloaded) {
      setIsLoaded(true);
    } else {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [preloaded, isMounted]);

  // Return false during SSR to prevent hydration mismatch
  return isMounted ? isLoaded : false;
}
