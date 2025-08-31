'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamically import Typewriter with no SSR
const Typewriter = dynamic(() => import('typewriter-effect'), {
  ssr: false,
  loading: () => <span>Hello!</span> // Fallback during hydration
});

interface TypewriterClientProps {
  options: {
    strings: string[];
    autoStart: boolean;
    loop: boolean;
  };
}

export default function TypewriterClient({ options }: TypewriterClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Show fallback during SSR and initial hydration
  if (!isMounted) {
    return <span>Hello!</span>;
  }

  return <Typewriter options={options} />;
}
